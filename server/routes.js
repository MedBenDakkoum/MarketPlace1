const router = require('express').Router();
const authController = require('./controllers/authController');
const productController = require('./controllers/productController');
const userController = require('./controllers/userController');
const messageController = require('./controllers/messageController');
const adminController = require('./controllers/adminController');
const storeController = require('./controllers/storeController');
const sellerController = require("./controllers/sellerController");
const settingsController = require("./controllers/settingsController");

const isAuth = require('./middlewares/isAuth');
const isAdmin = require('./middlewares/isAdmin');

router.get('/', (req, res) => {
    res.send('Server is running')
})

router.use('/auth', authController);
router.use('/products', productController);
router.use('/user', userController);
router.use('/messages', messageController);
router.use('/api/admin', isAdmin ,adminController);
router.use('/s/', storeController);
router.use('/api/seller',sellerController);
router.use('/settings',settingsController);

module.exports = router;