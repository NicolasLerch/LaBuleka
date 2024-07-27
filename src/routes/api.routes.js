let apiController = require('../controllers/apiController');
let apiCheckoutController = require('../controllers/apiCheckoutController');
let express = require('express');
let router = express.Router();


router.get('/products', apiController.getProducts);
router.get('/products/:id', apiController.getProductById);
router.get('/users', apiController.getUsers);
router.post('/checkout', apiCheckoutController.newOrder);
module.exports = router