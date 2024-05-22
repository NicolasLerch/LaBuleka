let productos = require('../models/products');
let path = require('path');
const fs = require('fs');

const productsFilePath = path.join(__dirname, '../models/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const mainController = {
    viewIndex : function (req, res){
        res.render('index', {productos: productos});
    },
    viewLocal : function (req, res){
        res.render('local');
    },
    viewTienda : function(req, res){
        res.render('tienda', {productos: productos});
    },
    viewProducts : function(req, res){
        res.render('index', {productos: productos.getAll()})
    },
    login: function(req, res){
        res.render('login')
    },
    register: function(req, res){
        res.render('register')
    },

    check: function(req, res){
        res.send(req.session.userLogged)
    }
}

module.exports = mainController;