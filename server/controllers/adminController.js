const router = require('express').Router();
const authService = require('../services/authService');
// const isAuth = require('../middlewares/isAuth');
// const isGuest = require('../middlewares/isGuest');
const { SECRET, ADMIN_COOKIE_NAME } = require('../config/config');
const jwt = require('jsonwebtoken');


router.get('/getInfo', async (req, res) => {
    try{
        if (req.adminUser) {
            let adminUser = await authService.getUser(req.adminUser._id);
            res.status(200).json({user: {_id: adminUser._id, adminUser: adminUser.name, email: adminUser.email, isAdmin: adminUser.isAdmin}})
        } else {
            res.status(404).json({message: "Not Found"});
        }
    }catch(err){
        console.error(err);
        res.status(404).json({message: "Not Found"});
    }
})
router.get('/logout', (req, res) => {
    try{
        res.clearCookie(ADMIN_COOKIE_NAME);
        res.status(200).json({ message: 'Successfully logged out' })
    }catch(err){
        console.log(err);
        res.status(404).json({message:"Not Found"})
    }
});

module.exports = router;