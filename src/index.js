const express = require('express');
const mongoose = require('mongoose');
const path = require ('path');

//const {mongoose} = require ('./database');

const app = express();

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares


//Routes


//Statics


//Start server
app.listen(app.get('port'), ()=>{
    console.log("Server on port: ", app.get('port'));
});
