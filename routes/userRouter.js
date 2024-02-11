const router = require('express').Router();
const userController = require('../controllers/UserController')

// Get all
router.get('/', async (req, res) => {
    const users = await userController.find();
    res.json(users);
});

// Create a new resource
router.post('/', async (req, res) => {
    const created = await userController.create(req, res);
    res.json(created);
});

module.exports = router