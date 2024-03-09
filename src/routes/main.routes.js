const express = require('express');
const path = require('path');
const router = express.Router();
const mainController = require('../controllers/mainController')
const productController = require('../controllers/productController');

router.get('/', mainController.viewIndex);
router.get('/local', mainController.viewLocal);
router.get('/tienda', mainController.viewTienda);



module.exports = router;