const db = require('../data/models');
const Op = db.Sequelize.Op


const mainController = {
    viewIndex : async function (req, res){
        let products = await db.Product.findAll({where: {available: 1}});
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
        res.render('index', {productos: productos.getAll({where: {available: 1}})})
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
                where: {name: {[Op.like]: `%${req.query.query_search}%`}, available: 1},
            })
            res.render('index', {productos: products})
        } catch(error){
            console.log(error);
            res.render('errorPage')
        }
        
    },
    sendMessage: async function(req, res){
        try{
            await db.Message.create(req.body);
            return res.status(200).json({success: true, message: "Mensaje enviado. Nos comunicaremos lo antes posible."})

        } catch(error){
            console.log(error);
            return res.status(400).json({success: false, message: "Error al enviar el mensaje. Intente nuevamente más tarde."})
        }
    }
}

module.exports = mainController;