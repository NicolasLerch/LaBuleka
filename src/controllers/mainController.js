let productos = require('../models/products');
let path = require('path');
const fs = require('fs');
const db = require('../data/models');


const mainController = {
    viewIndex : async function (req, res){
        let products = await db.Product.findAll();
        res.render('index', {productos: products});
    },
    viewLocal : function (req, res){
        res.render('local');
    },
    viewTienda : async function(req, res){
        try{
            let products = await db.Product.findAll();
            res.render('tienda', {productos: products});
        } catch(error){
            console.log(error);
            res.send('ocurrio un error inesperado');
        }
        
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
    },

    contact: function(req, res){
        res.render('contact')
    }
}

module.exports = mainController;