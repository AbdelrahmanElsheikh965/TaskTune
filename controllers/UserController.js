const User = require('../models/User')

const find = async () => await User.find()

// const insert = async (req, res) => await Todo.create(req.body)
const create = async (req, res) => {
    await User.create(req.body);
}

module.exports = {
    find,
    create,
}