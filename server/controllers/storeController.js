const { Router } = require('express');
const router = Router();
const { cloudinary } = require('../config/cloudinary');
const isAuth = require('../middlewares/isAuth')
const Product = require('../models/Product');
const User = require('../models/User');
const moment = require('moment');

const storeService = require('../services/storeService');

router.post('/:link', async (req, res) => {
    try {
        storeService.getProducts(req.params.link)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;