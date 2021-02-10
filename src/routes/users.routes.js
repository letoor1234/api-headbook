const express = require ('express');
const bcrypt = require('bcrypt');
const db = require('../database');
const router = express.Router();
const passport=require('passport');

const salt = 10; 
const User=require('../models/users');

router.get ('/', async (req, res)=>{
    const user = await User.find();

    res.json(user); 
});

router.get('/:id', async (req, res)=>{
    const user = await User.findById(req.params.id);
    
    res.json(user);
});

router.post('/register', (req,res,next)=> {
	passport.authenticate('local-register', (err,user,info)=>{
		const newUser = user.user;
		const mail = user.mail;
		const pass = user.pass;
		if(!err){
			if(!user){
				res.json(info);
			} else{
				res.json(user);
			} 
		} else{
			console.log(err);
		}
	})(req, res, next);
});
  
router.post('/login', (req,res, next)=>{
	passport.authenticate('local-login', (err, user, info)=>{
		if(!err){
			if(!user){
				res.json(info);
			} else{
				res.json(user);
			}
		} else{
			console.log(err);
		}
		
	})(req, res, next);
});

module.exports = router;