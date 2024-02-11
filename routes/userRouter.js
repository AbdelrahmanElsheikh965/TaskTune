const router = require('express').Router();
const userController = require('../controllers/UserController')
const todoController = require('../controllers/TodoController')

// Get all
router.get('/', async (req, res) => {
    const users = await userController.read();
    res.json(users);
});

// Register a new user
router.post('/', async (req, res) => {
    const created = await userController.create(req, res);
    res.status(200).json(created);
});


// Delete a user by id
router.delete('/:id', async (req, res) => {
    const user = await userController.deleteUser(req.params.id);
    res.status(200).json(`User is now deleted`);
})

// Edit the data of a user by id
router.patch('/:id', async (req, res) => {
    const user = await userController.updateUserData(req.params.id, req.body);
    res.status(200).json(`Updated this user's data`);
})


// Get all todos of a specific user
router.get('/:id/todos', async (req, res) => {
    const todos = await todoController.readUserTodos(req.params.id);
    res.json(todos);
});

module.exports = router