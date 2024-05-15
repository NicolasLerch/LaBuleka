let productos = require('../models/products');
let path = require('path');
const fs = require('fs');

const productsFilePath = path.join(__dirname, '../models/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    getAll : (req, res) => {
        res.render('allProducts', {productos: productos})
    },
    create : function(req, res){
        res.render('newProduct');
    },
    save: function(req, res){
        let maxId = 0;
        for (const obj of products) {
            if (obj.id && obj.id > maxId) {
                maxId = obj.id;
            }
        }

        const newProduct = {
            id: maxId + 1,
            name: req.body.name,
            img: req.file.filename,
            price: req.body.price,
            category: req.body.category,
            available: req.body.available
        }
        console.log(newProduct);

        products.push(newProduct);
        let productsJSON = JSON.stringify(products);
        fs.writeFileSync(productsFilePath, productsJSON);

        res.redirect("/products")
    }
}

module.exports = controller;