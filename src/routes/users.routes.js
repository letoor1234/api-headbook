const express = require ('express');
const bcrypt = require('bcrypt');
const db = require('../database');
const router = express.Router();

const User = require('../models/users.js');

const salt = 2;

router.get ('/', async (req, res)=>{
    const user = await User.find();

    res.json(user); 
});

router.get('/:id', async (req, res)=>{
    const user = await User.findById(req.params.id);
    
    res.json(user);
});

router.post('/register', async (req, res)=>{
    const user = req.body.user;
    const mail = req.body.mail;
    const pass = req.body.pass;

    bcrypt.hash(pass, salt)
        .then((hashedPass)=>{
            const newUser = new User ({user,mail, pass: hashedPass});
            return newUser;
        })
        .then((newUser)=>{
            newUser.save();
            res.json({uploaded: "true"});
        })
        .catch((err)=>{
            console.log("Error saving: ", err);
            res.json({uploaded: "false"});
            next();
        })
});

router.post('/login', async (req, res)=>{
    const user = req.body.user;
    const pass = req.body.pass;

    User.find({'user': user})
        .then((user)=>{
            return user[0];
        })
        .then((user)=>{
            console.log(user.pass)
            bcrypt.compare(pass, user.pass, (err, result)=>{
                if(!result){
                    res.json({login: "false"});
                    console.log("Password don't match");
                } else{
                    console.log("Correct password!");
                    res.json([{login: "true"}, user]);
                    //Iniciar session!!!!
                }
            })
        })
        .catch((err)=>{
            console.log(err);
            next();
        })
})

module.exports = router;