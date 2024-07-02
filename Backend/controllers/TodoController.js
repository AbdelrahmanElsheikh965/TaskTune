const Todo = require('../models/Todo')

const read = async (req) => {
    const {limit = 10, skip = 0, status = "to-do"} = req.query
    // Cast-ed data got from query params as they are dealt with as strings by default.
    return (!(limit > 12 )) ? await Todo.find({status}).limit(parseInt(limit)).skip(parseInt(skip)) : {message: "You can't exceed the limit"}
}

const create = async (req) =>  {
    // const maxId = await Todo.findOne({}, '_id').sort({ '_id': -1 }).limit(1)    // Bad for race conditions (concurrency)
    // req.body._id = maxId ? maxId._id + 1 : 1 
    return await Todo.create(req.body);
}

const readUserTodos = async (req) => await Todo.find({userId:  req.body.userId})

const editUserTodo = async (todoId, data) => {
    const targetTodo = await Todo.findOne({ _id: todoId })
    targetTodo.set(data);
    await targetTodo.save();
    // for assuring
    return await Todo.findOne({ _id: todoId })
}

const deleteUserTodo = async (todoId) => await Todo.findOneAndDelete({ _id: todoId })

module.exports = {
    read,
    create,
    readUserTodos,
    editUserTodo,
    deleteUserTodo,
}