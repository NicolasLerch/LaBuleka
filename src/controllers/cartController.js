let productos = require('../models/products');
let path = require('path');
const fs = require('fs');

const productsFilePath = path.join(__dirname, '../models/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const cartFilePath = path.join(__dirname, '../models/cart.json');
const billFilePath = path.join(__dirname, '../models/bill.json');


const controller = {

    cart: JSON.parse(fs.readFileSync(cartFilePath, 'utf-8')),
    getBill: function(req, res){
        let billTotal = 0;
        let cart = JSON.parse(fs.readFileSync(cartFilePath, 'utf-8'));

        console.log(cart);
        for(let i = 0; i < cart.length; i++){
            billTotal += parseInt(cart[i].price);
        }
        let bill = {
            count: cart.length,
            subtotal: billTotal,
            total: billTotal,
            discount: 0,
            date: new Date()
        }
        let billJSON = JSON.stringify(bill);
       
        return billJSON;
        
    },

    emptyCart: function(req, res){
        fs.writeFileSync(cartFilePath, "[]");
        fs.writeFileSync(billFilePath, "[]");
        res.redirect("/products");
    },

    getCart: function(req, res){
        controller.updateBill();
        let finalBill = JSON.parse(fs.readFileSync(billFilePath, 'utf-8'));
        let cart = JSON.parse(fs.readFileSync(cartFilePath, 'utf-8'));
        
        res.render('cart', {cart: cart, bill: finalBill});
    },

    updateBill : (req, res) =>{
        let bill = controller.getBill();
        fs.writeFileSync(billFilePath, bill);
    },

    addToCart: function(req, res){
        let productToAdd = products.find(product => product.id == req.params.id);
        let product = {
            name: productToAdd.name,
            price: parseInt(productToAdd.price)
        }
        let cart = JSON.parse(fs.readFileSync(cartFilePath, 'utf-8'));
        cart.push(product);
        let cartJSON = JSON.stringify(cart);
        fs.writeFileSync(cartFilePath, cartJSON);
        controller.updateBill();
        res.redirect('/products');
    }
}

module.exports = controller;