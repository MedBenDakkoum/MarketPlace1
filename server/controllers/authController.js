const router = require('express').Router();
const authService = require('../services/authService');
// const isAuth = require('../middlewares/isAuth');
// const isGuest = require('../middlewares/isGuest');
const { SECRET, COOKIE_NAME, ADMIN_COOKIE_NAME } = require('../config/config');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    try {
        let createdUser = await authService.registerUser(req.body);
        res.status(201).json({ _id: createdUser._id });
    } catch (error) {
        console.log(error)
        res.status(404).json({ error: error.message })
    }
});

router.post('/login', (req, res) => {
    authService.loginUser(req.body)
        .then(token => {
            jwt.verify(token, SECRET, (err, decoded) => {
                if (err) {
                    res.clearCookie(COOKIE_NAME);
                    res.clearCookie(ADMIN_COOKIE_NAME);
                } else {
                    if(decoded.isAdmin){
                        req.adminUser = decoded;
                        res
                        .status(200)
                        .cookie(ADMIN_COOKIE_NAME, token, { sameSite: 'none', secure: true, httpOnly: true })
                        .json({ user: decoded })
                    }else{
                        req.user = decoded;
                        res
                            .status(200)
                            .cookie(COOKIE_NAME, token, { sameSite: 'none', secure: true, httpOnly: true })
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
                    res.status(200).json({user: {_id: user._id, name: user.name, email: user.email, 
                        phoneNumber: user.phoneNumber, isSeller:user.isSeller, avatar: user.avatar}})
                }
        } else {
            res.status(200).json({message: "Not loged in"});
        }
    }catch(err){
        console.error(err);
    }
})


module.exports = router;