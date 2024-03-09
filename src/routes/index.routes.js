const express = require('express');
const path = require('path');
const router = express.Router();
const mainRoutes = require('./main.routes')
const productsRoute = require('./products.routes');

router.use("/", mainRoutes);
router.use('/', productsRoute);


module.exports = router;