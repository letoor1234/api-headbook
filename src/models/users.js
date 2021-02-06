const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSch = new Schema({
    user: {type: String, required: true},
    mail: {type: String, required: true},
    pass: {type: String, required: true}
});


module.exports = mongoose.model('User', userSch);