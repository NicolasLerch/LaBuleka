let db = require('../data/models');

let controller = {
    getProducts: async function(req, res){
        try{
            let products = await db.Product.findAll()
            let response = {
                meta: {
                    status: 200,
                    success: true,
                    total: products.length
                },
                products : products
            }
            return res.send(response)
        } catch(error){
            console.log(error)
            return res.render('errorPage')
        }
    },

    getProductById: async function(req, res){
        try{
            let product = await db.Product.findByPk(req.params.id)
            if(product){
                let response = {
                    meta: {
                        status: 200,
                        success: true
                    },
                    product: product
                }
                return res.send(response)
            }
            let response = {
                meta: {
                    status: 404,
                    success: false,
                    message: 'No se encontro el producto'
                }
            }
            // return res.render('errorPage')
        } catch (error){
            console.log(error)
            // let response ={
            //     status: 'error',
            //     message: 'No se pudo realizar la consulta. Intente nuevamente'
            // }
            return res.render('errorPage')
        }
    },

    getUsers : async function(req, res){
        try{
            let users = await db.User.findAll()
            let response = {
                meta: {
                    status: 200,
                    success: true,
                    total: users.length
                },
                users: users
            }
            return res.send(response)

        } catch (error){
            console.log(error);
            // let response = {
            //     status: 'error',
            //     message: 'No se pudo realizar la consulta. Intente nuevamente'
            // }
            res.render('errorPage')
        }

    }
}

module.exports = controller