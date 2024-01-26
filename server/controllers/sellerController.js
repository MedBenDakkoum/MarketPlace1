const { Router } = require('express');
const router = Router();
const { cloudinary } = require('../config/cloudinary');
const User = require('../models/User');
// const isAuth = require('../middlewares/isAuth')
const productService = require('../services/productService');
const userService = require('../services/userService');

router.post('/:id', async (req, res) => {
    try {
        let user = await userService.getSellerById(req.params.id);
        console.log(req.user);
        let jsonRes = {
            _id: user._id, name: user.name, email: user.email, phoneNumber: user.phoneNumber,
             avatar: user.avatar,
            isMe: req.user._id == req.params.id
        }
        res.status(200).json({user: jsonRes});
    } catch (error) {
        console.error(error)
        res.status(500).json({ error :error});
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

module.exports = router;