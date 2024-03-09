const path = require('path')
const productos = require('../models/products')

const mainController = {
    viewIndex : function (req, res){
        res.render('index', {productos: productos.getAll()});
    },
    viewLocal : function (req, res){
        res.render('local');
    },
    viewTienda : function(req, res){
        res.render('tienda', {productos: productos.getAll()});
    },
    viewProducts : function(req, res){
        res.render('index', {productos: productos.getAll()})
    }
}

module.exports = mainController;