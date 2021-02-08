const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt= require('bcrypt');

const userSchema = new Schema({
    user: {type: String, required: true},
    mail: {type: String, required: true},
    pass: {type: String, required: true}
});

userSchema.methods.hashPassword=(pass) =>{
    return bcrypt.hashSync(pass, 12);
};
//RETURN FALSE IF DONT MATCH!!!!
userSchema.methods.validPassword = (pass)=> {
    return bcrypt.compareSync(pass, this.pass);
};

module.exports = mongoose.model('User', userSchema);