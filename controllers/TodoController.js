const Todo = require('../models/Todo')

const read = async (req) => {
    const {limit = 10, skip = 0, status = "to-do"} = req.query
    return await Todo.find({ status: status }).limit(limit).skip(skip)
}

const create = async (req, res) =>  {
    const maxId = await Todo.findOne({}, '_id').sort({ '_id': -1 }).limit(1)
    req.body._id = maxId ? maxId._id + 1 : 1 
    return Todo.create(req.body);
}

const readUserTodos = async (id) => await Todo.find({userId: id})

const editUserTodo = async (userId, todoId, data) => {
    const targetTodo = await Todo.findOne({ userId: userId, _id: todoId })
    targetTodo.set(data);
    await targetTodo.save();
    // for assuring
    return await Todo.findOne({ userId: userId, _id: todoId })
}

const deleteUserTodo = async (userId, todoId) => await Todo.findOneAndDelete({ userId: userId, _id: todoId })

module.exports = {
    read,
    create,
    readUserTodos,
    editUserTodo,
    deleteUserTodo,
}