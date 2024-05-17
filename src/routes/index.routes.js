const express = require('express');
const path = require('path');
const router = express.Router();
const mainRoutes = require('./main.routes')
const productsRoutes = require('./products.routes');
const userRoutes = require('./clients.routes')

router.use("/", mainRoutes);
router.use('/products', productsRoutes);
router.use('/users', userRoutes)


module.exports = router;