const express = require("express");
const path = require("path");
const fs = require("fs");
const bcryptjs = require("bcryptjs");
const { log } = require("console");
const db = require("../data/models");

let usersFilePath = path.join(__dirname, "../models/users.json");
let users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

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
        console.log(userToLogin);
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
  profile: function (req, res) {
    let buys = []
    res.render("userProfile", { buys: buys });
  },

  edit: function (req, res) {
    let userToEdit = users.find((user) => user.id == req.session.userLogged.id);
    let userIndex = users.findIndex((user) => user.id == userToEdit.id);

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
      let userEdited = {
        id: userToEdit.id,
        name: req.body.name,
        lastName: req.body.lastName,
        mail: req.body.email,
        password: userPassword,
        cart: userToEdit.cart,
        rol: userToEdit.rol,
      };
      users[userIndex] = userEdited;
      req.session.userLogged = userEdited;

      let usersJSON = JSON.stringify(users);
      fs.writeFileSync(usersFilePath, usersJSON);
      res.redirect("/users/profile");
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
      let userIndex = users.findIndex((user) => user.id == userId);
      if (userIndex === -1) {
        throw new Error("Usuario no encontrado");
      }
      users.splice(userIndex, 1);

      // Guardar el archivo JSON actualizado
      await new Promise((resolve, reject) => {
        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
          if (err) {
            return reject("Error al guardar los datos");
          }
          resolve();
        });
      });

      req.session.destroy();

      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: "Error al eliminar el usuario." });
    }
  },

  logout: function (req, res) {
    req.session.destroy();
    res.redirect("/");
  },

  allBuys: function (req, res) {
    let buysPath = path.join(
      __dirname,
      "../models/bills/bill" + req.session.userLogged.cart + ".json"
    );
    let buys = JSON.parse(fs.readFileSync(buysPath, "utf-8"));
    res.render("allBuys", { buys });
  },
};

module.exports = controller;
