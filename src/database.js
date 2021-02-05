const mongoose = require ('mongoose');

const URI = 'mongodb://localhost/headbook';

mongoose.connect(URI)
    .then(db=>{
        console.log('DB Connected');
    })
    .catch(err=>{
        console.log(err);
    })

module.exports = mongoose;