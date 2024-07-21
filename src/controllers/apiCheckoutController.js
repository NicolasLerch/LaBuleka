let db = require("../data/models");

let controller = {
  newOrder: async function (req, res) {
    try {
        let orderProducts = req.body.products
        console.log(req.body);
        let order = await db.Order.create(
        {
          total: req.body.total,
          paymentMethod: req.body.paymentMethod,
          userId: req.session.userLogged.id,
          orderProducts: req.body.products,
        },
        {
            include: [{model: db.OrderProduct, as: 'orderProducts'}],
        }
        
      );
      console.log(order);
      res.json({success: true, status: 200, order: order})
      
    } catch (error) {
      console.log(error);
      return res.send("Ocurrio un error inesperado. Intente nuevamente.");
    }
  },
};

module.exports = controller;
