const { Router } = require('express');
const router = Router();
const User = require('../models/User');
// const isAuth = require('../middlewares/isAuth')
const userService = require('../services/userService');
const imageService = require('../services/imageService');
const cartService = require('../services/cartService');

router.get('/', async (req, res) => {
    try {
        let user = await userService.getUserById(req.user._id);
        let jsonRes;
        if(req.user._id == user._id){
            jsonRes = {
                _id: user._id,
                name: user.name,
                gender: user.gender,
                email: user.email, 
                phoneNumber: user.phoneNumber, 
                avatar: user.avatar || "",
                banner:user.banner || "",
                address: user.address,
                line1:user.address.line1,
                line2:user.address.line2,
                zipCode:user.address.zipCode,
                city:user.address.city,
                country:user.address.country,
                state:user.address.state,
                userId: user.userId,
                isMe: req.user._id == req.params.id
            }
        }else{
            jsonRes = {}
        }
               
        res.status(200).json(jsonRes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error :error});
    }
})
router.put('/', async (req, res) => {
    try {   
        let newData={
            name: req.body.data.name,
            gender: req.body.data.gender,
            phoneNumber: req.body.data.phoneNumber,
            email: req.body.data.email,
            address: req.body.data.address,
            avatar: req.body.data.avatar,
            banner: req.body.data.banner
        }
        let user = await userService.updateProfile(req.user._id,newData);
        let newpass={}
        if(req.body.data.password.currentPass!=="" || req.body.data.password.newPass!==""  || req.body.data.password.reNewPass!==""){
            newpass = await userService.updatePassword(req.user._id,req.body.data.password);
        }
        res.status(200).json({user,newpass});
    } catch (err) {
        console.error(err);
        res.status(500).json({status:"fail","msg":err.message});
    }
})
router.post('/image/upload', async (req,res) => {
    try{
        let rslt = await imageService.uploadImage(req.body.data);
        res.status(200).json({"url":rslt}); 
    }catch(err){
        console.error(err);
        res.status(404).json({message: "Not Found"});
    }
})
router.patch('/edit-profile/:id', async (req, res) => {
    //TODO: Rewrite this 
    let { name, phoneNumber, email } = req.body;
    try {
        let errors = [];
        let checkUser = await User.findOne({ email });

        if (checkUser && checkUser._id.toString() !== req.user._id.toString()) errors.push('This email address is already in use; ');
        if (name.length < 3 || name.length > 50) errors.push('Name should be at least 3 characters long and max 50 characters long; ')
        if (/(\+)?(359|0)8[789]\d{1}(|-| )\d{3}(|-| )\d{3}/.test(phoneNumber) == false) errors.push('Phone number should be a valid BG number; ');
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == false) errors.push("Please fill a valid email address; ");

        if (req.body.avatar) {
            if (!req.body.avatar.includes('image')) errors.push('The uploaded file should be an image; ');
        }

        if (errors.length >= 1) throw { message: [errors] };

        if (req.body.avatar) {
            let compressedImg = await imageService.uploadImage(req.body.avatar);
            await userService.edit(req.params.id, { name, phoneNumber, email, avatar: compressedImg });
            res.status(201).json({ message: 'Updated!', avatar: compressedImg });
        } else {
            await userService.edit(req.params.id, { name, phoneNumber, email });
            res.status(201).json({ message: 'Updated!' });
        }
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
})

router.get('/isSeller', async (req,res)=>{
    try {
        let user = await userService.getUserById(req.user._id);
        if(user.createdSells){
            res.status(200).json({isSeller: true});
        }else{
            res.status(200).json({isSeller: false});
        }
    } catch (error) {
        res.status(500).json({ error });
    }
});
router.get('/cart', async (req,res)=>{
    try {
        let cart = await cartService.getCart(req.user._id);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error });
    }
});
router.put('/cart', async (req,res)=>{
    try {
        let cart = await cartService.addToCart(req.user._id,req.body);
        res.status(200).json(cart)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
});

router.delete('/cart', async (req,res)=>{
    try {
        let cart = await cartService.removeFromCart(req.user._id,req.body.cartItemId);
        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error :error.message });
    }
});
router.get('/address',async (req,res)=>{
    try {
        let address = await userService.getAddress(req.user._id);
        res.status(200).json(address);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error :error.message });
    }
})
router.get('/orders',async (req,res)=>{
    try {
        let orders = await orderService.getOrdersByClientId(req.user._id);
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error :error.message });
    }
})
router.put('/orders',async (req,res)=>{
    try {
        let cart = await orderService.makeOrder(req.user._id,req.body.paymentMethod);
        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error :error.message });
    }
})
router.get('/:id', async (req, res) => {
    try {
        let user = await userService.getUserById(req.params.id);
        let jsonRes;
        if(req.user._id == req.params.id){
            jsonRes = user;
        }else{
            jsonRes = {
                _id: user._id,
                name: user.name,
                email: user.email, 
                phoneNumber: user.phoneNumber, 
                avatar: user.avatar,
                address: user.address,
                userId: user.userId,
                isMe: req.user._id == req.params.id
            }
        }
        
        res.status(200).json(jsonRes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error :error});
    }
})
module.exports = router;