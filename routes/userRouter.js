const router = require('express').Router();
const userController = require('../controllers/UserController')
const verifyToken = require('../middlewares/AuthMiddleware')

// Get all
router.get('/', async (req, res) => {
    const users = await userController.read();
    res.json(users);
});

// Register a new user
router.post('/', async (req, res) => {
    await userController.create(req, res);
});

// Login a user
router.post('/login', async (req, res) => {
    try {
        const created = await userController.login(req.body.username, req.body.password);
        res.status(200).json(created);
    } catch (error) {
        res.status(401).json("Check your input data | authentication failed");
    }
});


// Delete a user by id
router.delete('/:id', async (req, res) => {
    try {
        const user = await userController.deleteUser(req.params.id);
        res.status(200).json(`User is now deleted`);
    } catch (error) {
        res.status(404).json('Not found resource');
    }
})

// User can get his data
router.get('/me', verifyToken, async (req, res) => {
    const userData = await userController.readMyData(req.body.userId)
    res.status(200).json({"Message" : "Success", "Data":userData});
})

// User can edit his data
router.put('/update-me', verifyToken, async (req, res) => {
    const userData = await userController.updateUserData(req.body)
    res.status(200).json({"Message" : "Success", "Data":userData});
})


module.exports = router