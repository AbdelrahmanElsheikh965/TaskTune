const router = require('express').Router();
const todoController = require('../controllers/TodoController')

// Get all
router.get('/', async (req, res) => {
    const todos = await todoController.read(req);
    res.json(todos);
});

// User can add a new todo
router.post('/', async (req, res) => {
    try {
        const created = await todoController.create(req, res);
        res.status(200).json(created);
    } catch (error) {
        res.status(422).json('Unprocessable Content');
    }                   
});

// User can edit his own todos
router.patch('/:todoId', async (req, res) => {
    try {
        const {userId, data} = req.body
        const todo = await todoController.editUserTodo(userId, req.params.todoId, data);
        res.status(200).json(`Updated Successfully`);
    } catch (error) {
        res.status(422).json('Unprocessable Content');
    }
});

// User can delete his own todos
router.delete('/:todoId', async (req, res) => {
try {
       await todoController.deleteUserTodo(req.body.userId, req.params.todoId);
       res.status(200).json(`Deleted Successfully`);
} catch (error) {
    res.status(404).json('Not found resource');
}
});

module.exports = router