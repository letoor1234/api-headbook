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
        .then((users)=>{
			if(users.length){
				const user = users[0];
				
				bcrypt.compare(pass, user.pass, (err, result)=>{
					if(!result){		
						console.log("Password don't match");
						res.json({login: "true", passMatch: "false"});
						
					} else{
						console.log("Correct password!");
						res.json([{login: "true", passMatch:"true"}, user]);
						//Iniciar session!!!!
					}
					
				})
			} else{
				res.json([{login: "false", passMatch: "false"}])
			}
			
			console.log(res.json);
        })
        .catch((err)=>{
            console.log(err);
            next();
        })
})

module.exports = router;