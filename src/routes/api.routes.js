let apiController = require('../controllers/apiController');
let express = require('express');
let router = express.Router();


router.get('/products', apiController.getProducts);
router.get('/products/:id', apiController.getProductById);
router.get('/users', apiController.getUsers);
module.exports = router