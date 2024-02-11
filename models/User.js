const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required : true,
        unique: true,
        minLength:  8,
    },
    firstName : {
        type: String,
        required: true,
        minLength:  3,
        maxLength:  15,
    },
    lastName : {
        type: String,
        required: true,
        minLength:  3,
        maxLength:  15,
    },
    password : {
        type: String,
        required: true,
    },
    dob: { 
        type: Date
    },

})

const users = mongoose.model('Users', UserSchema);

module.exports = users