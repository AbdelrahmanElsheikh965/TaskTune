const User = require('../models/User')

// Only project data to firstName excluding _id
const read = async () => await User.find({}, 'firstName -_id')

const create = async (req, res) => await User.create(req.body)

const deleteUser = async (id) => await User.findByIdAndDelete(id)

const updateUserData  = async (userId, data) => await User.findOneAndUpdate({_id: userId}, data)


module.exports = {
    read,
    create,
    deleteUser,
    updateUserData
}