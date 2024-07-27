let path = require('path');
const fs = require('fs');

const controller = {
    getCart: function(req, res){
        
        res.render('cart', {cart:[]});
    }
}


module.exports = controller;