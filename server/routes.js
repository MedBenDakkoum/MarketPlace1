const router = require('express').Router();
const authController = require('./controllers/authController');
const productController = require('./controllers/productController');
const userController = require('./controllers/userController');
const adminController = require('./controllers/adminController');
const storeController = require('./controllers/storeController');
const sellerController = require("./controllers/sellerController");
const settingsController = require("./controllers/settingsController");
const publicController = require("./controllers/publicController");
const testController = require("./controllers/testController");

const isAuth = require('./middlewares/isAuth');
const isAdmin = require('./middlewares/isAdmin');

router.get('/', (req, res) => {
    res.send('Server is running')
})

router.use('/auth', authController);
router.use('/api/products', productController);
router.use('/api/user', userController);
router.use('/api/admin', isAdmin ,adminController);
router.use('/api/store', storeController);
router.use('/api/seller',sellerController);
router.use('/api/settings',settingsController);
router.use('/api/public',publicController);
router.use('/api/test',testController);

module.exports = router;