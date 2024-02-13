const router = require('express').Router();
const todoController = require('../controllers/TodoController')
const verifyToken = require('../middlewares/AuthMiddleware')

// User can read his todos
router.get('/', verifyToken, async (req, res) => {
    const todos = await todoController.readUserTodos(req);
    res.status(200).json(todos);
});

// User can add a new todo
router.post('/', verifyToken, async (req, res) => {
    const created = await todoController.create(req, res);        
    res.status(200).json(created);
});

// User can edit his own todos
router.patch('/:todoId', verifyToken, async (req, res) => {
    const {data} = req.body
    const todo = await todoController.editUserTodo(req.params.todoId, data);
    res.status(200).json(todo);
});

// User can delete his own todos
// remaining if same id sent also return 'deleted Successfully'
router.delete('/:todoId', verifyToken, async (req, res) => {
    await todoController.deleteUserTodo(req.params.todoId);
    res.status(200).json(`Deleted Successfully`);
});

module.exports = router