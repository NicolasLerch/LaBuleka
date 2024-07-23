const express = require("express");
const path = require("path");
const fs = require("fs");
const bcryptjs = require("bcryptjs");
const { log } = require("console");
const db = require("../data/models");

const controller = {
  create: async function (req, res) {
    let hashedPassword = bcryptjs.hashSync(req.body.password, 10);
    let equalPass = bcryptjs.compareSync(req.body.repPassword, hashedPassword);

    if (!equalPass) {
      return res.status(400).json({ error: "Las contraseñas no coinciden." });
    }

    try {
      await db.User.create({
        name: req.body.name,
        last_name: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        rol: "client",
      });
      return res.redirect('/')
    } catch (error) {
      console.log(error);
      return res.send("Ocurrio un error inesperado. Intente nuevamente.");
    }
    
  },

  processLogin: async function (req, res) {
    let mail =  req.body.email.toLowerCase().trim()
  
    let userToLogin;

    try {
        userToLogin = await db.User.findOne({ where: { email: mail } });
        
    } catch (error) {
        console.log(error);
        res.send("No se encuentra el usuario");
    }

    if (userToLogin != null) {
      if (bcryptjs.compareSync(req.body.password, userToLogin.password)) {
        req.session.userLogged = userToLogin;
        
        res.redirect("/users/profile");
      } else {
        res.status(400).json({ error: "Contraseña incorrecta" });
      }
    } else {
      res.status(400).json({ error: "Usuario no encontrado." });
    }
  },
  profile: async function (req, res) {
    try{
      let orders = await db.Order.findAll({where: {userId : req.session.userLogged.id}});
      res.render("userProfile", { orders: orders });
    } catch(error){
      console.log(error);
      res.send("ocurrio un error inesperado");
    }
    
  },

  edit: async function (req, res) {
    let buys = []
    let userToEdit = await db.User.findOne({ where: { id: req.session.userLogged.id } });
    let userPassword = userToEdit.password;
    let equalPass = true;

    if (req.body.password != "" && req.body.repPassword != "") {
      if (req.body.password === req.body.repPassword) {
        // Si las contraseñas coinciden, generar el hash
        let hashedPassword = bcryptjs.hashSync(req.body.password, 10);
        userPassword = hashedPassword;
      } else {
        equalPass = false;
      }
    }

    if (equalPass) {
      try{
        await db.User.update({
          ...userToEdit,
          name: req.body.name,
          last_name: req.body.lastName,
          email: req.body.email,
          password: userPassword,
          rol: userToEdit.rol
        }, { where: { id: req.session.userLogged.id } });

        let userEdited = await db.User.findOne({ where: { id: req.session.userLogged.id } });
        req.session.userLogged = userEdited;
        // console.log(req.session.userLogged);
        
        return res.redirect('/users/profile');
      } catch(error){
        console.log(error);
        return res.send("Ocurrio un error inesperado. Intente nuevamente.");
      }
      
    } else {
      res.status(400).json({ error: "Las contraseñas no coinciden." });
    }
  },

  delete: async function (req, res) {
    const userId = req.session.userLogged.id;

    if (!userId) {
      return res.json({
        success: false,
        message: "Usuario no encontrado en la sesión.",
      });
    }

    try {
      await db.User.destroy({ where: { id: userId } });
      req.session.destroy();
      return res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: "Error al eliminar el usuario." });
    }
  },

  logout: function (req, res) {
    req.session.destroy();
    res.redirect("/");
  },

 
  getOrder: async function(req, res){
    try{
      let order = await db.Order.findOne({
        where: { id: req.params.id },
        include: [
          {
            model: db.OrderProduct,
            as: 'orderProducts',
          }
        ]
      })

      // res.send(order)

      if(!order){
        res.send('No existe el pedido')
      }

      if(order.userId != req.session.userLogged.id){
        res.send('Este pedido no es tuyo.')
      }

      res.render('order', {order: order})
    } catch(error){
      console.log(error)
      res.send("ocurrio un error inesperado")
    }
    

  }
};

module.exports = controller;
