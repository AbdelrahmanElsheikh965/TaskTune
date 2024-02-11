const Todo = require('../models/Todo')

const read = async (req) => {
    const {limit = 10, skip = 0, status = "to-do"} = req.query
    return await Todo.find({ status: status }).limit(limit).skip(skip)
}

const create = async (req) =>  Todo.create(req.body).then(newTodo => newTodo)

const readUserTodos = async (id) => await Todo.find({userId: id})

const editUserTodo = async (userId, todoId, data) => {
    const targetTodo = await Todo.findOne({ userId: userId, _id: todoId })
    targetTodo.set(data);
    await targetTodo.save();
}

const deleteUserTodo = async (userId, todoId) => {
    await Todo.findOneAndDelete({ userId: userId, _id: todoId })
}

module.exports = {
    read,
    create,
    readUserTodos,
    editUserTodo,
    deleteUserTodo,
}