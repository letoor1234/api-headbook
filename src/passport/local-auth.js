const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User=require('../models/users');
//passport methods
passport.serializeUser((user, done)=>{//return session saveing after pss.use(lcl-strateg, new lclStr)
    done(null, use.id);
})

passport.deserializeUser(async(id, done)=>{//return user from database after serializeUser
    const user=await User.findById(id);
    done(null, user);
})
//using strategy
passport.use('local-register', new localStrategy({
    usernameField: 'user',
    passwordField: 'pass',
    passReqToCallback: true
}, async (req, mail, user, pass, done)=>{
    console.log('eto si');
    const mailYet= User.find({'mail':req.mail});
    if(mailYet){
        return done(null, false, {mailExist: true});
    } else{
        const userYet=User.find({'user': user});
        if(userYet){
           return done(null, false, {userExist: true}); 
        } else{
            const newUser =new User();//using model
            newUser.user = user; 
            newUser.mail = mail;
            newUser.pass = user.hashPassword(pass);
            await newUser.save();//set and save model data
			console.log('todo guardado');
            done(null, newUser);//return of strategy(err, data)
        }
    } 
}))

passport.use('local-login', new localStrategy({
    usernameField: 'user',
    passwordField: 'pass',
    passReqToCallback: true
}, async (req, user, pass, done)=>{
    console.log('eto si');
	
	const userYet=User.find({'user': user});
	if(!userYet){
	   console.log("usuario no existe!");
	   return done(null, false, {userExist: false, passMatch: false}); 
	} else{
		if(userYet.validPassword(pass)){
			console.log("usuarop y pass ok!");
			done(null, userYet, {userExist: true, passMatch: true});//return of strategy(err, data)
		}else{
			console.log("password dont match");
			done(null, false, {userExist: true,passMatch: false});//return of strategy(err, data)
		}
	}
}))