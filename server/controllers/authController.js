const router = require('express').Router();
const authService = require('../services/authService');
// const isAuth = require('../middlewares/isAuth');
// const isGuest = require('../middlewares/isGuest');
const { SECRET, COOKIE_NAME, ADMIN_COOKIE_NAME,EMPLOYEE_COOKIE_NAME } = require('../config/config');
const jwt = require('jsonwebtoken');
const emailService = require("../services/emailService")
const User = require("../models/User")
const Token = require("../models/Token")
const crypto = require("crypto");
const bcrypt = require('bcrypt');
const { SALT } = require('../config/config');
const settingsService = require("../services/settingsService")
router.post('/register', async (req, res) => {
    try {
        let settings = await settingsService.getSettings();
        if(req.body.isSeller && !settings.AllowNewSellers){
            res.status(400).json({msg:"Cant register new users"})
        }else{
            await authService.registerUser(req.body)
            .then((createdUser)=>{
                res.status(201).json({ _id: createdUser._id });
            }).catch((err)=>{
                res.status(409).json({errors:err});
            })
        }
    } catch (error) {
        res.status(404).json({ errors: error.message })
    }
});

router.post('/login', (req, res) => {
    authService.loginUser(req.body)
        .then(token => {
            if(token=="notActive"){
                res.status(200).json({isActive:false});
            }else if(token=="suspended"){
                res.status(200).json({isSuspended:true});
            }else{
                jwt.verify(token, SECRET, (err, decoded) => {
                    if (err) {
                        res.clearCookie(COOKIE_NAME);
                    } else {
                        req.user = decoded;
                        res
                            .status(200)
                            .cookie(COOKIE_NAME, token, { sameSite: 'none', secure: true, httpOnly: true })
                            .json({ user: decoded })
                    }
                })
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: error })
        })
});
router.post('/system/login', (req, res) => {
    authService.loginAdmin(req.body)
        .then(token => {
            jwt.verify(token, SECRET, (err, decoded) => {
                if (err) {
                    res.clearCookie(EMPLOYEE_COOKIE_NAME);
                    res.clearCookie(ADMIN_COOKIE_NAME);
                } else {
                    if(decoded.isAdmin){
                        req.adminUser = decoded;
                        res
                        .status(200)
                        .cookie(ADMIN_COOKIE_NAME, token, { sameSite: 'none', secure: true, httpOnly: true })
                        .json({ user: decoded })
                    }else{
                        req.employeeUser = decoded;
                        res
                            .status(200)
                            .cookie(EMPLOYEE_COOKIE_NAME, token, { sameSite: 'none', secure: true, httpOnly: true })
                            .json({ user: decoded })
                    }
                }
            })
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: error })
        })
});

router.post('/logout', (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.status(200).json({ message: 'Successfully logged out' })
});

router.get('/getUser', async (req, res) => {
    try{
        if (req.user) {
                let user = await authService.getUser(req.user._id);
                if(user.isAdmin){
                    res.status(200).json({user: {_id: user._id, name: user.name, email: user.email, isAdmin:1}})
                }else{
                    if(user.isSeller){
                    res.status(200).json({user: 
                        {_id: user._id, name: user.name, email: user.email, 
                        phoneNumber: user.phoneNumber, isSeller:user.isSeller,
                        avatar: user.avatar,
                        balance: user.balance,
                        isSubscribed: user.subscription.isSubscribed
                        }})
                    }else{
                        res.status(200).json({user: 
                            {
                                _id: user._id,
                                name: user.name,
                                email: user.email, 
                                phoneNumber: user.phoneNumber, 
                                isSeller:user.isSeller,
                                avatar: user.avatar,
                                balance: user.balance,
                        }})
                    }
                }
        } else {
            res.status(200).json({message: "Not logged in"});
        }
    }catch(err){
        console.error(err);
    }
})

router.post('/password-reset', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(400).send("Email not found !");

        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const link = `http://localhost:3000/auth/password-reset/${user._id}/${token.token}`;
        await emailService.sendEmail(user.email, "Password reset", "Need to reset your password?<br><br>Click your secret link: <a href='"+link+"' target='_blank'>Here</a><br><br>If you did not forget your password, you can ignore this email.");

        res.send("Email Sent !");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
})
router.post("/password-reset/:userId/:token", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(400).send("Invalid link or expired");

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link or expired");
        user.password = req.body.password;
        await user.save();
        await token.delete();

        res.send("password reset sucessfully.");
    } catch (error) {
        res.status(400).send(error.message);
        console.log(error);
    }
});

module.exports = router;