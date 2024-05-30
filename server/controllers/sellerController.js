const { Router } = require('express');
const router = Router();
const User = require('../models/User');
const Order = require('../models/Order');

// const isAuth = require('../middlewares/isAuth')
const userService = require('../services/userService');
const storeService = require('../services/storeService');
const sellerService = require('../services/sellerService');
const imageService = require('../services/imageService');
const productService = require('../services/productService');
const initProdsService = require('../services/initProdsService');
const settingsService = require('../services/settingsService');
const transactionService = require('../services/transactionService');
const notificationService = require('../services/notificationService');

const Product = require('../models/Product');
const Store = require('../models/Store');

router.get('/', async (req, res) => {
    try {
        let user = await sellerService.getSellerById(req.user._id);
        res.status(200).json(user);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error :error});
    }
})
router.get('/notifications', async (req, res) => {
    try {
        console.log(req.user);
        await notificationService.getNotificationsById(req.user._id)
        .then((notifications)=>{
            res.status(200).json(notifications);
        })
        .catch((err)=>{
            res.status(500).json(err.message);
        })
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.get('/notifications/read', async (req, res) => {
    try {
        await notificationService.setNotificationsToRead(req.user._id)
        .then((rslt)=>{
            res.status(200).json({message:"Notifications read"});
        })
        .catch((err)=>{
            res.status(500).json(err.message);
        })
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.put('/', async (req, res) => {
    try {   
        console.log(req.body.data);
        
        if(req.body.data.hasOwnProperty("socials")){
            let settings = await settingsService.getSettings();
            if(settings.SellerCanAddSocials){
                let user = await userService.updateProfile(req.user._id,req.body.data);
                res.status(200).json(user.socials);
            }else{
                res.status(200).json(req.body.data.socials);
            }
            
        }else{
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
            if(req.body.data.hasOwnProperty("password")){
                if(req.body.data.password.currentPass!=="" || req.body.data.password.newPass!==""  || req.body.data.password.reNewPass!==""){
                    console.log(req.body.data.password);
                    newpass = await userService.updatePassword(req.user._id,req.body.data.password);
                }
            }
            res.status(200).json({user,newpass});
        }
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
        if(req?.user?._id==undefined){
            res.status(401).json({message:"Not Authenticated"});
        }else{
            let user = await sellerService.getDashboardHome(req.user._id);
            res.status(200).json(user);
        }
    } catch (error) {
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
        let rslt = await imageService.uploadImage(req.body.data);
        res.status(200).json({"url":rslt}); 
    }catch(err){
        console.error(err);
        res.status(404).json({message: "Not Found"});
    }
});

router.get('/products', async (req,res) => {
    try{
        await productService.getProdsBySellerId(req.user._id).then((rslt)=>{
            res.status(200).json(rslt); 
        }).catch((err)=>{
            res.status(400).json(err.message)
        })
    }catch(err){
        console.error(err);
        res.status(404).json({message: "Not Found"});
    }
});

router.post('/products', async (req,res) => {
    try{
        productService.assignProdToSeller(req.user._id,req.body).then((rslt)=>{
            res.status(200).json(rslt); 
        });
    }catch(err){
        console.error(err);
        res.status(404).json({message: "Not Found"});
    }
});

router.get('/products/init', async (req,res) => {
    try{
        let storeId = await User.findById(req.user._id,{"idStore":1});
        let cats = await Store.findById(storeId.idStore,{"categories":1})
        initProdsService.getInitProds(cats.categories).then((rslt)=>{
            res.status(200).json(rslt); 
        });
    }catch(err){
        console.error(err);
        res.status(404).json({message: "Not Found"});
    }
});

router.get('/products/:id/init', async (req,res) => {
    try{
        let initProdId = await Product.findById(req.params.id,{"initialProduct":1});
        initProdsService.getInitProdById(initProdId.initialProduct).then((rslt)=>{
            res.status(200).json(rslt); 
        });
    }catch(err){
        console.error(err);
        res.status(404).json({message: "Not Found"});
    }
});
router.post('/products/:id/remove', async (req,res) => {
    try{
        let product = await Product.findById(req.params.id);
        if(!product){
            res.status(400).json({msg:"Not found"})
        }else{
            await Order.find({
                "products.productId": req.params.id,
                "status": { $ne: "COMPLETED" }
            }).then(async (orders)=>{
                if(orders.length>0){
                    res.status(400).json({msg:"You have orders with this Product"});
                }else{
                    await product.delete().then((rslt)=>{
                        res.status(200).json({msg:"Removed"})
                    }).catch((err)=>{
                        res.status(400).json({msg:"Error removing product"})
                    })
                }
            })
        }

    }catch(err){
        console.error(err);
        res.status(404).json({message: "Not Found"});
    }
});

router.get('/products/:id/price', async (req,res) => {
    try{
        //add check if product is owned by seller
        productService.getProductPriceByProductId(req.params.id).then((rslt)=>{
            res.status(200).json(rslt); 
        });
    }catch(err){
        console.error(err);
        res.status(404).json({message: "Not Found"});
    }
});

router.put('/products/:id/price', async (req,res) => {
    try{
        //add check if product is owned by seller
        productService.changeProductPrice(req.params.id,req.body).then((rslt)=>{
            res.status(200).json(rslt); 
        });
    }catch(err){
        console.error(err);
        res.status(404).json({message: "Not Found"});
    }
});

router.get('/products/:id/images', async (req,res) => {
    try{
        productService.getProductImages(req.params.id).then((rslt)=>{
            res.status(200).json(rslt); 
        });
    }catch(err){
        console.error(err);
        res.status(404).json({message: "Not Found"});
    }
});

router.put('/products/:id/images', async (req,res) => {
    try{
        productService.updateProductImages(req.params.id,req.body).then((rslt)=>{
            res.status(200).json(rslt); 
        });
    }catch(err){
        console.error(err);
        res.status(404).json({message: "Not Found"});
    }
})
router.get('/products/:id/seo', async (req,res) => {
    try{
        productService.getProductSeo(req.params.id).then((rslt)=>{
            res.status(200).json(rslt); 
        });
    }catch(err){
        console.error(err);
        res.status(404).json({message: "Not Found"});
    }
})
router.put('/products/:id/seo', async (req,res) => {
    try{
        productService.updateProductSeo(req.params.id,req.body).then((rslt)=>{
            res.status(200).json(rslt); 
        });
    }catch(err){
        console.error(err);
        res.status(404).json({message: "Not Found"});
    }
})
router.get('/products/:id/attributes', async (req,res) => {
    try{
        productService.getProductAttributes(req.params.id).then((rslt)=>{
            res.status(200).json(rslt); 
        });
    }catch(err){
        console.error(err);
        res.status(404).json({message: "Not Found"});
    }
})
router.post('/products/:id/toggle', async (req,res) => {
    try{
        productService.toggleActive(req.params.id).then((rslt)=>{
            res.status(200).json(rslt);
        });
    }catch(err){
        console.error(err);
        res.status(404).json({message: "Not Found"});
    }
})
router.get('/transactions', async (req, res) => {
    try {
        let transactions = await transactionService.getTransactions(req.user._id);
        res.status(200).json(transactions);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error :error});
    }
})
router.post('/transactions/request', async (req, res) => {
    try {
        await transactionService.requestTransaction(req.user._id)
        .then((rslt)=>{
            res.status(200).json(rslt);
        })
        .catch((err)=>{
            res.status(400).json(err);
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error :error});
    }
})
router.post('/subscribe', async (req, res) => {
    try {
        await sellerService.subscribe(req.user._id).then((rslt)=>{
            res.status(200).json(rslt);
        }).catch((err)=>{
            res.status(200).json(err);
        })
    } catch (error) {
        console.error(error)
        res.status(500).json(error);
    }
})
router.get('/:id', async (req, res) => {
    try {
        let user = await sellerService.getSellerById(req.params.id);
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