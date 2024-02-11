const router = require('express').Router();
const todoController = require('../controllers/TodoController')

// Get all
router.get('/', async (req, res) => {
    const todos = await todoController.find();
    res.json(todos);
});

// Create a new resource
router.post('/', async (req, res) => {
    const created = await todoController.create(req, res);
    res.status(200).json(`Created Successfully`);
});

// Delete all resources
router.delete('/', async (req, res) => {
    const deleted = await todoController.deleteAll(req, res);
    res.status(200).json(`Deleted`);
});

module.exports = router