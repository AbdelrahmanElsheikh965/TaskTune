const User = require('../models/User')
const jwt = require('jsonwebtoken')

const readMyData = async (id) => await User.find({_id: id})

const read = async () => await User.find({}, 'firstName -_id')

const create = async (req, res) => {
    try {
        await User.create(req.body).then( user => user)
        const registeredUser = await User.find({username: req.body.username})
        const token = jwt.sign({ userId: registeredUser._id }, '123', { expiresIn: '1h'});
        req.body.password = undefined   // don't return password
        res.status(201).json({"user": req.body, "token": token});
    } catch (error) {
        res.status(422).json("Check your input data");
    }
}
const deleteUser = async (id) => await User.findByIdAndDelete(id )

const updateUserData  = async (bodyData) => User.findOneAndUpdate({_id: bodyData.userId}, bodyData).then(function () {
    return User.findById(bodyData.userId);
})

const login = async(username, password) => {
    const user = await User.findOne({username: username});
    const result = await user.comparePasswords(password);
    const token = jwt.sign({ userId: user._id }, '123', { expiresIn: '1h'});
    if (token && result) return {"user": user, "token": token};
    throw new Error
}

module.exports = {
    read,
    readMyData,
    create,
    deleteUser,
    updateUserData,
    login
}