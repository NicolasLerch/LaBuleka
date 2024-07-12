let productos = require('../models/products');
let path = require('path');
const fs = require('fs');

const productsFilePath = path.join(__dirname, '../models/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const cartFilePath = path.join(__dirname, '../models/cart.json');
const billFilePath = path.join(__dirname, '../models/bill.json');


const controller = {

    // cart: JSON.parse(fs.readFileSync(cartFilePath, 'utf-8')),
    getBill: function(req, res){
        let cartPath = path.join(__dirname, '../models/carts/'+req.session.userLogged.cart+'.json');
        let billPath = path.join(__dirname, '../models/bills/bill'+req.session.userLogged.cart+'.json');
        let billTotal = 0;       

        let cart = JSON.parse(fs.readFileSync(cartPath, 'utf-8'));
        let bills = JSON.parse(fs.readFileSync(billPath, 'utf-8'))

        let maxId = 0;
        for (const obj of bills) {
            if (obj.id && obj.id > maxId) {
                maxId = obj.id;
            }
        }  

        for(let i = 0; i < cart.length; i++){
            billTotal += parseInt(cart[i].subtotal);
        }

        let buy = {
            id: maxId +1,
            count: cart.length,
            subtotal: billTotal,
            total: billTotal,
            discount: 0,
            date: new Date()
        }
        let buyJSON = JSON.stringify(buy);
       
        return buyJSON;
        
    },

    emptyCart: function(req, res){
        let cartPath = path.join(__dirname, '../models/carts/'+req.session.userLogged.cart+'.json');
        fs.writeFileSync(cartPath, "[]");
        res.redirect("/products");
    },

    getCart: function(req, res){
        controller.updateBill(req, res);
        
        let userLogged = req.session.userLogged;
        let billPath = path.join(__dirname, '../models/bills/bill'+req.session.userLogged.cart+'.json');
        let cartPath = path.join(__dirname, '../models/carts/'+req.session.userLogged.cart+'.json');
        if (!fs.existsSync(cartPath)) {
            fs.writeFileSync(cartPath, '[]');
        }
        let bill = JSON.parse(fs.readFileSync(billPath, 'utf-8'));
        let cart = JSON.parse(fs.readFileSync(cartPath, 'utf-8'));

        let finalBill = bill[bill.length -1]
        console.log(finalBill);
        

        res.render('cart', {cart: cart, bill: finalBill});
    },

    updateBill : (req, res) =>{
        if (!fs.existsSync(path.join(__dirname, '../models/bills/bill'+req.session.userLogged.cart+'.json'))) {
            fs.writeFileSync(path.join(__dirname, '../models/bills/bill'+req.session.userLogged.cart+'.json'), '[]');
        }
    },

    addToCart: function(req, res){
        // let thUser = req.session.userLogged;
        let cartPath = path.join(__dirname, '../models/carts/'+req.session.userLogged.cart+'.json');
        if (!fs.existsSync(cartPath)) {
            fs.writeFileSync(cartPath, '[]');
        }
        let cart = JSON.parse(fs.readFileSync(cartPath, 'utf-8'))
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
        fs.writeFileSync(cartPath, cartJSON);
        controller.updateBill(req, res);
        res.redirect('/products');
    },

    deleteFromCart: function(req, res){
        let cartPath = path.join(__dirname, '../models/carts/'+req.session.userLogged.cart+'.json');
        let cart = JSON.parse(fs.readFileSync(cartPath, 'utf-8'));
        let productToDelete = cart.find(product => product.id == req.params.id)
        let productIndex = cart.indexOf(productToDelete)
        cart.splice(productIndex, 1);
        fs.writeFileSync(cartPath, JSON.stringify(cart));
        res.redirect('/cart')
    },

    checkout: function(req, res){
        let bill = JSON.parse(controller.getBill(req, res));
        let buysPath =  path.join(__dirname, '../models/bills/bill'+req.session.userLogged.cart+'.json');
        let cartPath = path.join(__dirname, '../models/carts/'+req.session.userLogged.cart+'.json');
        cart = JSON.parse(fs.readFileSync(cartPath, 'utf-8'));

        console.log(bill);

        let buy = {
            ...bill,
            detalle: cart
        }
        let buys = JSON.parse(fs.readFileSync(buysPath, 'utf-8'))
        buys.push(buy);
        fs.writeFileSync(buysPath, JSON.stringify(buys))
        fs.writeFileSync(cartPath, "[]");
        res.redirect('/users/profile')
    }
}


module.exports = controller;