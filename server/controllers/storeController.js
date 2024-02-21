const { Router } = require('express');
const router = Router();
const { cloudinary } = require('../config/cloudinary');
const isAuth = require('../middlewares/isAuth')
const Product = require('../models/Product');
const User = require('../models/User');
const moment = require('moment');

const storeService = require('../services/storeService');

router.get('/:link', async (req, res) => {
    try {
        let storeInfo = await storeService.getInfoByLink(req.params.link);
        if(storeInfo){
            storeService.getProducts(req.params.link).then(function(storeProds){
                res.status(200).json({info:storeInfo,products:storeProds});
            });
        }else{
            res.status(404).json({msg:"Not found"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;