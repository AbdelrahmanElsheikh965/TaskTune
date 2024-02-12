const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

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
        minLength: 8
    },
    dob: { 
        type: Date
    },

})

UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 8, (err, hash) => {
        
        if (err) return next(err);

        this.password = hash;
        next();
    })
})

UserSchema.methods.comparePasswords = async function(password) {
    return await bcrypt.compare(password, this.password)
}

const users = mongoose.model('Users', UserSchema);

module.exports = users