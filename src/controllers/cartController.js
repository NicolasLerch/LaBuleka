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
            billTotal += parseInt(cart[i].subtotal);
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
        let cart = JSON.parse(fs.readFileSync(cartFilePath, 'utf-8'));
        let productToAdd = products.find(product => product.id == req.params.id);
        let quantity = 0;
        if(req.body.quantity == null || req.body.quantity == ""){
            quantity = 1;
        } else {
            quantity = req.body.quantity;
        }

        let maxId = 0;
        for (const obj of cart) {
            if (obj.id && obj.id > maxId) {
                maxId = obj.id;
            }
        }        

        let product = {
            id: maxId + 1,
            name: productToAdd.name,
            price: parseInt(productToAdd.price),
            quantity: quantity,
            subtotal: parseInt(productToAdd.price) * quantity
        }
        
        cart.push(product);
        let cartJSON = JSON.stringify(cart);
        fs.writeFileSync(cartFilePath, cartJSON);
        controller.updateBill();
        res.redirect('/products');
    },

    deleteFromCart: function(req, res){
        let cart = JSON.parse(fs.readFileSync(cartFilePath, 'utf-8'));
        let productToDelete = cart.find(product => product.id == req.params.id)
        let productIndex = cart.indexOf(productToDelete)
        cart.splice(productIndex, 1);
        fs.writeFileSync(cartFilePath, JSON.stringify(cart));
        res.redirect('/cart')
    }
}


module.exports = controller;