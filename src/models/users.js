const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt= require('bcrypt');

const userSchema = new Schema({
    user: {type: String, required: true},
    mail: {type: String, required: true},
    pass: {type: String, required: true}
});

userSchema.methods.validPassword = (pass)=> {
    return bcrypt.compareSync(pass, this.pass);
};

userSchema.virtual("password").set((value) =>{
    this.pass = bcrypt.hashSync(value, 12);
});

module.exports = mongoose.model('User', userSchema);