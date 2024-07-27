const db = require('../data/models');
const Op = db.Sequelize.Op


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
            res.render('errorPage');
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
    },
    search: async function(req, res){
        try{
            let products = await db.Product.findAll({
                where: {name: {[Op.like]: `%${req.query.query_search}%`} }
            })
            res.render('index', {productos: products})
        } catch(error){
            console.log(error);
            res.render('errorPage')
        }
        
    }
}

module.exports = mainController;