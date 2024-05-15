const express = require('express');
const path = require('path');
const router = express.Router();
const mainRoutes = require('./main.routes')
const productsRoutes = require('./products.routes');

router.use("/", mainRoutes);
router.use('/products', productsRoutes);


module.exports = router;