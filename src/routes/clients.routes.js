const express = require('express');
// const productController = require('../controllers/productController');
const router = express.Router();
const multer = require("multer")
const path = require("path")
const userController = require('../controllers/userController');
const cartController = require('../controllers/cartController');

router.post('/login', userController.processLogin);
router.get('/profile', userController.profile)

router.post('/edit', userController.edit)

router.delete('/delete', userController.delete)

router.post('/logout', userController.logout)

router.get('/buys', userController.allBuys)


module.exports = router;