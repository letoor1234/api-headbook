const express = require('express');
const {mongoose} = require ('./database');
const cors = require('cors');
const passport=require('passport');
const localStrategy=require('passport-local').Strategy;
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');
const session= require('express-session');
const User = require('./models/users.js');
//Statics here

//Statics here



const app = express();

//Settings
app.set('port', process.env.PORT || 4000);

//Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser('secret'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

const loginStrategy = new localStrategy((user, pass, done)=>{
    User.findOne({'user': user})
        .then((userReceived)=>{
            console.log("pasa por aqui");
            if(!userReceived || !userReceived.validPassword(pass)){
                return done(null, false, {message: "Invalid"});
            }
            return done(null, userReceived);
        })
        .catch((err)=>{
            return done(null, false);
        })
});

passport.use('login-user', loginStrategy);
passport.serializeUser((user, done)=>{
    done(null, user._id);
});

passport.deserializeUser((id, done)=>{
    done(null, User.findByID(id));
});

//Routes
app.use('/api/users', require('./routes/users.routes'));


//Start server
app.listen(app.get('port'), ()=>{
    console.log("Server on port: ", app.get('port'));
});