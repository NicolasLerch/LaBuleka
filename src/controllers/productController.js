let productos = require('../models/products');
let path = require('path');
const fs = require('fs');
const db = require('../data/models');

const productsFilePath = path.join(__dirname, '../models/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    getAll : async (req, res) => {
        let products = await db.Product.findAll();
        res.render('allProducts', {productos: products})
    },
    create : function(req, res){
        res.render('newProduct');
    },
    save: async function(req, res){
        

        let mainImage = "";
        if(!req.file || req.file == undefined){
            mainImage = "default.avif";
        } else {
            mainImage = req.file.filename;
        }

        const newProduct = {
            name: req.body.name,
            image: mainImage,
            price: req.body.price,
            category: req.body.category,
            available: req.body.available,
            stock: req.body.stock
        }
       
        try {
            await db.Product.create({
                name: req.body.name,
            image: mainImage,
            price: req.body.price,
            category: req.body.category,
            available: req.body.available,
            stock: req.body.stock
            });
        } catch (error) {
            console.log(error);
        }

        res.redirect("/products")
    },

    productsList : async function(req, res){
        let products = await db.Product.findAll();
        res.render("productsList", {productos : products})
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