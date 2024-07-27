const express = require('express');
const path = require('path');
const router = express.Router();
const mainRoutes = require('./main.routes')
const productsRoutes = require('./products.routes');
const userRoutes = require('./clients.routes')
const apiRoutes = require('./api.routes')

router.use("/", mainRoutes);
router.use('/products', productsRoutes);
router.use('/users', userRoutes)
router.use('/api', apiRoutes)


module.exports = router;