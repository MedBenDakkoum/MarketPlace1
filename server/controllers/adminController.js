const router = require('express').Router();
const authService = require('../services/authService');
// const isAuth = require('../middlewares/isAuth');
// const isGuest = require('../middlewares/isGuest');
const { SECRET, COOKIE_NAME } = require('../config/config');
const jwt = require('jsonwebtoken');


router.get('/getInfo', async (req, res) => {
    if (req.user) {
        let user = await authService.getUser(req.user._id);
        console.log(user);
        res.status(200).json({user: {_id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin}})
    } else {
        res.status(200).json({message: "Not loged in"});
    }
})


module.exports = router;