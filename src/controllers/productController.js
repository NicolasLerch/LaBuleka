let path = require('path');
const fs = require('fs');
const db = require('../data/models');

const controller = {
    getAll : async (req, res) => {
        try{
            let products = await db.Product.findAll();
            res.render('allProducts', {productos: products})
        } catch(error){
            console.log(error);
            res.render('errorPage')
        }       
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
            res.render('errorPage')
        }

        res.redirect("/products")
    },

    productsList : async function(req, res){
        try{
            let products = await db.Product.findAll();
            res.render("productsList", {productos : products})
        }catch(error){
            console.log(error);
            res.render('errorPage')
        }
        
    },

    edit: async function(req, res){

            let productToEdit = await db.Product.findByPk(req.params.id);
            if (!productToEdit) {
                res.render("404");
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
           res.render('errorPage')
       }

        res.redirect("/products/all");
    },
    delete: async function(req, res){
        try{
            let productToDelete = await db.Product.findByPk(req.params.id)
            if(!productToDelete){
                res.render('404')
            }    
            await db.Product.destroy({where: {id: req.params.id}});
            res.redirect("/products/all");
        } catch(error){
            console.log(error);
            res.render('errorPage')
        }
        
    },

    getProductsByCategory: async function(req, res){
        try{
            let products =  await db.Product.findAll({where: {category: req.params.category}})
            res.render('tienda', {productos: products})

        } catch(error){
            console.log(error);
            res.render('errorPage')
        }
    }
}

module.exports = controller;