const Todo = require('../models/Todo')

const find = async () => await Todo.find()


// const insert = async (req, res) => await Todo.create(req.body)
const create = async (req, res) => {
    await Todo.create(req.body);
}

const deleteAll = async (req, res) => {
    await Todo.deleteMany();
}

module.exports = {
    find,
    create,
    deleteAll,  
}