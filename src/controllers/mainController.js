const path = require('path')

const mainController = {
    viewIndex : function (req, res){
        res.render('index');
    },
    viewLocal : function (req, res){
        res.render('local');
    },
    viewTienda : function(req, res){
        res.render('tienda');
    }
}

module.exports = mainController;