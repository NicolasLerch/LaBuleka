const express = require('express');
const path = require('path');
const fs = require('fs');
const bcryptjs = require('bcryptjs')

let usersFilePath = path.join(__dirname, '../models/users.json');
let users= JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controller = {    

    create: function(req, res){
        maxId = 0;
        for (const obj of users) {
            if (obj.id && obj.id > maxId) {
                maxId = obj.id;
            }
        }

        let hashedPassword = bcryptjs.hashSync(req.body.password, 10);
        let equalPass = bcryptjs.compareSync(req.body.repPassword, hashedPassword)
        console.log(hashedPassword);

        if(!equalPass){
            res.status(400).json({ error: "Las contraseñas no coinciden." });
        } else {
            const newUser={          
                id: maxId +1,
                name: req.body.name,
                lastName: req.body.lastName,
                mail: req.body.email,
                password: hashedPassword
            }
    
            users.push(newUser)
            fs.writeFileSync(usersFilePath, JSON.stringify(users));
            console.log(newUser)

            res.send(users)

        }        
    }

}

module.exports = controller;