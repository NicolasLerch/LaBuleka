const express = require('express');
const path = require('path');
const router = express.Router();
const mainController = require('../controllers/mainController')
const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');
const userController = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', mainController.viewIndex);
router.get('/local', mainController.viewLocal);
router.get('/tienda', mainController.viewTienda);


router.get('/login', mainController.login)
router.get('/register', mainController.register)
router.post('/register', userController.create)

router.get('/cart', authMiddleware, cartController.getCart);
// router.post('/cart/:id', cartController.addToCart);


router.get('/contact', mainController.contact)

module.exports = router;