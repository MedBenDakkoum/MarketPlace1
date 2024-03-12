const { Router } = require('express');
const router = Router();
const Product = require('../models/Product');
const initialProduct = require('../models/initialProduct');
const User = require('../models/User');
const moment = require('moment');
const {getStoreByProductId} = require("../services/storeService");

router.get('/', async (req, res) => {
    const { page, search } = req.query;
    try {
        let products;
        if (search !== '' && search !== undefined) {
            products = await Product.find();
            products = products.filter(x => x.active == true)
            products = products.filter(x => x.title.toLowerCase().includes(search.toLowerCase()) || x.city.toLowerCase().includes(search.toLowerCase()))
            res.status(200).json({ products: products, pages: products.pages });
        } else {
            products = await Product.paginate({}, { page: parseInt(page) || 1, limit: 5 });
            products.docs = products.docs.filter(x => x.active == true)
            res.status(200).json({ products: products.docs, pages: products.pages });
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        let iP = await initialProduct.findById(product.initialProduct);
        let storeData = await getStoreByProductId(req.params.id);
        res.status(200).json({product:product,initialProduct:iP,store:storeData});
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.get('/specific/:id', async (req, res) => {
    try {
        let product = await (await Product.findById(req.params.id)).toJSON()
        let seller = await (await User.findById(product.seller)).toJSON()
        product.addedAt = moment(product.addedAt).format('d MMM YYYY (dddd) HH:mm')
        let jsonRes = {
            ...product,
            name: seller.name,
            phoneNumber: seller.phoneNumber,
            email: seller.email,
            createdSells: seller.createdSells.length,
            avatar: seller.avatar,
            sellerId: seller._id,
            isAuth: false
        }
        if (req.user) {
            let user = await User.findById(req.user._id)
            jsonRes.isSeller = Boolean(req.user._id == product.seller);
            jsonRes.isWished = user.wishedProducts.includes(req.params.id)
            jsonRes.isAuth = true
        }
        res.status(200).json(jsonRes);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

module.exports = router;