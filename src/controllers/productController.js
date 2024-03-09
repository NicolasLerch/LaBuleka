let productos = require('../models/products');
let path = require('path');

const controller = {
    getAll : (req, res) => res.render('prueba', {productos: productos.getAll()})
    }

module.exports = controller;