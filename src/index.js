const express = require('express');
const {mongoose} = require ('./database');
const cors = require('cors');
const app = express();

//Settings
app.set('port', process.env.PORT || 4000);

//Middlewares
app.use(express.json());
app.use(cors());
//Routes
app.use('/api/users', require('./routes/users.routes'));
//Statics


//Start server
app.listen(app.get('port'), ()=>{
    console.log("Server on port: ", app.get('port'));
});
