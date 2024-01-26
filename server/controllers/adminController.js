const router = require('express').Router();
const adminService = require("../services/adminService")
// const isAuth = require('../middlewares/isAuth');
// const isGuest = require('../middlewares/isGuest');
const { SECRET, ADMIN_COOKIE_NAME } = require('../config/config');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
    try{
        if (req.adminUser) {
            let adminUser = await adminService.getAdmin(req.adminUser._id);
            res.status(200).json({user: {_id: adminUser._id, adminUser: adminUser.name, email: adminUser.email, isAdmin: adminUser.isAdmin}})
        } else {
            res.status(200).json({user: {isAdmin:false}});
        }
    }catch(err){
        console.error(err);
        res.status(404).json({message: "Not Found"});
    }
})
router.post('/logout', (req, res) => {
    try{
        res.clearCookie(ADMIN_COOKIE_NAME);
        res.status(200).json({ message: 'Successfully logged out' })
    }catch(err){
        console.log(err);
        res.status(404).json({message:"Not Found"})
    }
});

router.get('/sellers', async (req,res) => {
    try{
        let sellers = await adminService.getSellers();
        res.status(200).json(sellers); 
    }catch(err){
        console.error(err);
        res.status(404).json({message: "Not Found"});
    }
})
router.get('/sellers/:id', async (req,res) => {
    try{
        let seller = await adminService.getSellerById(req.params.id);
        res.status(200).json(seller); 
    }catch(err){
        console.error(err);
        res.status(404).json({message: "Not Found"});
    }
})
router.put('/sellers/:id', async (req,res) => {
    try{
        // console.log(req.body.message);
        let rslt = await adminService.updateSeller(req.params.id,req.body.message);
        res.status(200).json({"seller":rslt.rslt2,"store":rslt.rslt1}); 
    }catch(err){
        console.error(err);
        res.status(404).json({message: "Not Found"});
    }
})
module.exports = router;