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

    edit: async function(req, res){

            let productToEdit = await db.Product.findByPk(req.params.id);
            if (!productToEdit) {
                res.send('No existe el producto');
            }

        let mainImage;

        if(!req.file || req.file == undefined || req.file == "default.avif"){
            mainImage = productToEdit.img;
        } else {
            mainImage = req.file.filename;
        }

       try{
           await db.Product.update({
            name: req.body.name,
            image: mainImage,
            price: req.body.price,
            category: req.body.category,
            available: req.body.available == null ? 1 : req.body.available,
            stock: req.body.stock
           }, {where : { id : req.params.id}})
       } catch(error){
           console.log(error);
           res.send('Ocurrio un error inesperado. No se pudo modificar el producto. Intente nuevamente');
       }

        res.redirect("/products/all");
    },
    delete: async function(req, res){
        let productToDelete = await db.Product.findByPk(req.params.id)
        if(!productToDelete){
            res.send('No existe el producto');
        }

        await db.Product.destroy({where: {id: req.params.id}});
        res.redirect("/products/all");
    },
    tryDB: async function(req, res){
        let products = await db.Product.findAll();
        res.send(products);
    }
}

module.exports = controller;