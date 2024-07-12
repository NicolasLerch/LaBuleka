let productos = require('../models/products');
let path = require('path');
const fs = require('fs');
const db = require('../data/models');

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

        let mainImage = "";
        if(!req.file || req.file == undefined){
            mainImage = "default.avif";
        } else {
            mainImage = req.file.filename;
        }

        const newProduct = {
            id: maxId + 1,
            name: req.body.name,
            img: mainImage,
            price: req.body.price,
            category: req.body.category,
            available: req.body.available
        }
        console.log(newProduct);

        products.push(newProduct);
        let productsJSON = JSON.stringify(products);
        fs.writeFileSync(productsFilePath, productsJSON);

        res.redirect("/products")
    },

    productsList : function(req, res){
        res.render("productsList", {productos})
    },

    edit: function(req, res){
        let productToEdit = products.find(product => product.id == req.params.id);
        let productIndex = products.indexOf(productToEdit);
        console.log(productToEdit);

        let mainImage = "";

        if(!req.file || req.file == undefined || req.file == "default.avif"){
            mainImage = productToEdit.img;
        } else {
            mainImage = req.file.filename;
        }

        products[productIndex] = {
            id: req.params.id,
            name: req.body.name,
            img: mainImage,
            price: req.body.price,
            category: req.body.category,
            stock: req.body.stock,
            available: req.body.available
        }

        let productsJSON = JSON.stringify(products);
        fs.writeFileSync(productsFilePath, productsJSON);

        res.redirect("/products/all");
    },
    delete: function(req, res){
        let productToDelete = products.find(product => product.id == req.params.id);
        let productIndex = products.indexOf(productToDelete);
        console.log(productToDelete);
        products.splice(productIndex, 1);
        let productsJSON = JSON.stringify(products);
        fs.writeFileSync(productsFilePath, productsJSON);
        res.send(products);
    },
    tryDB: async function(req, res){
        let products = await db.Product.findAll();
        res.send(products);
    }
}

module.exports = controller;