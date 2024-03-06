const express = require('express');
const path = require('path');
const router = express.Router();
const mainRoutes = require('./main.routes')
const productRoutes = require('./products.routes');

router.use("/", mainRoutes);

module.exports = router;