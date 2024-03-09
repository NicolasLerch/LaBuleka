const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

// router.use('/productos', productController.getAll);
router.get("/productos", productController.getAll);

module.exports = router;