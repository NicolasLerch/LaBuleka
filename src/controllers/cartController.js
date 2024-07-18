let productos = require('../models/products');
let path = require('path');
const fs = require('fs');

const productsFilePath = path.join(__dirname, '../models/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const cartFilePath = path.join(__dirname, '../models/cart.json');
const billFilePath = path.join(__dirname, '../models/bill.json');


const controller = {
    getCart: function(req, res){
        
        res.render('cart', {cart:[]});
    }
}


module.exports = controller;