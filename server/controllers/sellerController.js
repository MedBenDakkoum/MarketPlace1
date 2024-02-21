const { Router } = require('express');
const router = Router();
const User = require('../models/User');
// const isAuth = require('../middlewares/isAuth')
const productService = require('../services/productService');
const userService = require('../services/userService');
const storeService = require('../services/storeService');
const Product = require('../models/Product');
const Store = require('../models/Store');
router.get('/', async (req, res) => {
    try {
        let user = await userService.getSellerById(req.user._id);
        res.status(200).json(user);
    } catch (error) {
        console.error(error)
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
            console.log(req.body.data.password);
            newpass = await userService.updatePassword(req.user._id,req.body.data.password);
        }
        res.status(200).json({user,newpass});
    } catch (error) {
        console.error(error)
        res.status(500).json({ error :error});
    }
})
router.get('/store', async (req, res) => {
    try {
        if(!req.user){
            res.status(401).json({message:"Not Authenticated"});
        }
        let user = await User.findById(req.user._id);
        let store = await storeService.getStoreById(user.idStore);
        res.status(200).json(store);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error : "Error"});
    }
})
router.put('/store', async (req, res) => {
    try {
        if(!req.user){
            res.status(401).json({message:"Not Authenticated"});
        }
        let user = await User.findById(req.user._id);
        let store = await storeService.updateStore(user.idStore,req.body.data);
        res.status(200).json(store);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error : "Error"});
    }
})
router.get('/dashboard', async (req, res) => {
    try {
        if(req.user._id==undefined){
            res.status(401).json({message:"Not Authenticated"});
        }
        let user = await userService.getDashboardHome(req.user._id);
        res.status(200).json(user);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error : "Error"});
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
router.post('/image/upload', async (req,res) => {
    try{
        let rslt = await userService.uploadImage(req.body.data);
        res.status(200).json({"url":rslt}); 
    }catch(err){
        console.error(err);
        res.status(404).json({message: "Not Found"});
    }
})
router.get('/products', async (req,res) => {
    try{
        userService.getProds(req.user._id).then((rslt)=>{
            res.status(200).json(rslt); 
        });
    }catch(err){
        console.error(err);
        res.status(404).json({message: "Not Found"});
    }
})
router.post('/products', async (req,res) => {
    try{
        userService.addProd(req.user._id,req.body).then((rslt)=>{
            res.status(200).json(rslt); 
        });
    }catch(err){
        console.error(err);
        res.status(404).json({message: "Not Found"});
    }
})
router.get('/products/init', async (req,res) => {
    try{
        let storeId = await User.findById(req.user._id,{"idStore":1});
        let cats = await Store.findById(storeId.idStore,{"categories":1})
        userService.getInitProds(cats.categories).then((rslt)=>{
            res.status(200).json(rslt); 
        });
    }catch(err){
        console.error(err);
        res.status(404).json({message: "Not Found"});
    }
})
router.get('/products/:id/init', async (req,res) => {
    try{
        let initProdId = await Product.findById(req.params.id,{"initialProduct":1});
        userService.getInitProdById(initProdId.initialProduct).then((rslt)=>{
            res.status(200).json(rslt); 
        });
    }catch(err){
        console.error(err);
        res.status(404).json({message: "Not Found"});
    }
})
router.get('/products/:id/price', async (req,res) => {
    try{
        //add check if product is owned by seller
        userService.getProductPrice(req.params.id).then((rslt)=>{
            res.status(200).json(rslt); 
        });
    }catch(err){
        console.error(err);
        res.status(404).json({message: "Not Found"});
    }
})
router.put('/products/:id/price', async (req,res) => {
    try{
        //add check if product is owned by seller
        userService.changeProductPrice(req.params.id,req.body).then((rslt)=>{
            res.status(200).json(rslt); 
        });
    }catch(err){
        console.error(err);
        res.status(404).json({message: "Not Found"});
    }
})
router.get('/products/:id/images', async (req,res) => {
    try{
        userService.getProductImages(req.params.id).then((rslt)=>{
            res.status(200).json(rslt); 
        });
    }catch(err){
        console.error(err);
        res.status(404).json({message: "Not Found"});
    }
})
router.put('/products/:id/images', async (req,res) => {
    try{
        userService.updateProductImages(req.params.id,req.body).then((rslt)=>{
            res.status(200).json(rslt); 
        });
    }catch(err){
        console.error(err);
        res.status(404).json({message: "Not Found"});
    }
})
router.get('/products/:id/seo', async (req,res) => {
    try{
        userService.getProductSeo(req.params.id).then((rslt)=>{
            res.status(200).json(rslt); 
        });
    }catch(err){
        console.error(err);
        res.status(404).json({message: "Not Found"});
    }
})
router.put('/products/:id/seo', async (req,res) => {
    try{
        userService.updateProductSeo(req.params.id,req.body).then((rslt)=>{
            res.status(200).json(rslt); 
        });
    }catch(err){
        console.error(err);
        res.status(404).json({message: "Not Found"});
    }
})
router.post('/products/:id/toggle', async (req,res) => {
    try{
        userService.toggleActive(req.params.id).then((rslt)=>{
            res.status(200).json(rslt);
        });
    }catch(err){
        console.error(err);
        res.status(404).json({message: "Not Found"});
    }
})
router.get('/:id', async (req, res) => {
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
module.exports = router;