const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Only project data to firstName excluding _id
const read = async () => await User.find({}, 'firstName -_id')

const create = async (req) => User.create(req.body).then( user => user )

const deleteUser = async (id) => await User.findByIdAndDelete(id)

const updateUserData  = async (userId, data) => User.findOneAndUpdate({_id: userId}, data).then( function () {
    // Return the newly updated value.
    return User.findById(userId);
})

const login = async(username, password) => {
    const user = await User.findOne({username: username});
    const result = await user.comparePasswords(password);
    const token = jwt.sign({ userId: user._id }, '123', { expiresIn: '1h'});
    if (token && result) return token;
    throw new Error
}

module.exports = {
    read,
    create,
    deleteUser,
    updateUserData,
    login
}