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
    try {
        const created = await userController.create(req, res);
        res.status(200).json(created);
    } catch (error) {
        res.status(422).json("Check your input data");
    }
});

// Login a user -------------------------------------------------------------
router.post('/login', async (req, res) => {
    try {
        const created = await userController.login(req.body.username, req.body.password);
        res.status(200).json('logged in');
    } catch (error) {
        res.status(422).json("Check your input data");
    }
});
// --------------------------------------------------------------------------


// Delete a user by id
router.delete('/:id', async (req, res) => {
    try {
        const user = await userController.deleteUser(req.params.id);
        res.status(200).json(`User is now deleted`);
    } catch (error) {
        res.status(404).json('Not found resource');
    }
})

// Edit the data of a user by id
router.patch('/:id', async (req, res) => {
    try {
        const user = await userController.updateUserData(req.params.id, req.body);
        res.status(200).json({user : user});
    } catch (error) {
        res.status(404).json('Not found resource');
    }
})


// Get all todos of a specific user
router.get('/:id/todos', async (req, res) => {
    try {
        const todos = await todoController.readUserTodos(req.params.id);
        res.json(todos);
    } catch (error) {
        res.status(404).json('Not found resource');
    }
});

module.exports = router