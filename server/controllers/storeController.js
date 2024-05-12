const { Router } = require('express');
const router = Router();
const User = require('../models/User');
const orderService = require('../services/orderService');
const storeService = require('../services/storeService');
const productService = require('../services/productService');

router.get('/orders', async (req, res) => {
    try {
        let storeId = await User.findById(req.user._id,{"idStore":1});
        let orders = await orderService.getVerifiedOrdersByStoreId(storeId.idStore);
        res.status(200).json(orders);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
})
router.get('/:link', async (req, res) => {
    try {
        let storeInfo = await storeService.getPublicInfoByLink(req.params.link);
        if(storeInfo){
            productService.getProductsByStoreLink(req.params.link).then(function(storeProds){
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