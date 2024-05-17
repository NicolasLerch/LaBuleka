const express = require('express');
// const productController = require('../controllers/productController');
const router = express.Router();
const multer = require("multer")
const path = require("path")
const userController = require('../controllers/userController');

router.post('/login', userController.processLogin);

module.exports = router;