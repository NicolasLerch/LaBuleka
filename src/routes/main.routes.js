const express = require('express');
const path = require('path');
const router = express.Router();
const mainController = require('../controllers/mainController')
const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');

router.get('/', mainController.viewIndex);
router.get('/local', mainController.viewLocal);
router.get('/tienda', mainController.viewTienda);
router.get('/cart', cartController.getCart);
router.post('/cart/:id', cartController.addToCart);

// limpiar el carrito completo
router.delete('/cart', cartController.emptyCart)

// borrar un elemento del carrito
router.delete('/cart/:id', cartController.deleteFromCart)



module.exports = router;