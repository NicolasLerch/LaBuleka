let db = require("../data/models");

let controller = {
  newOrder: async function (req, res) {
    try {
        let order = await db.Order.create(
        {
          total: req.body.total,
          paymentMethod: req.body.paymentMethod,
          userId: req.session.userLogged.id,
          date: req.body.date,
          time: req.body.time,
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
