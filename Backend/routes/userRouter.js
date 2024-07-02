const router = require('express').Router();
const userController = require('../controllers/UserController')
const verifyToken = require('../middlewares/AuthMiddleware')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Task Tune API',
            version: '1.5.0'
        }
    },
    apis: ['./routes/userRouter.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions)


/**
 * @swagger
 * /users:
 *   get:
 *     description: Get all users
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: No data
 */
router.get('/', async (req, res) => {
    const users = await userController.read();
    res.json(users);
});


/**
 * @swagger
 *  /users:
 *   post:
 *     summary: Registers a new user.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         schema:
 *           type: object
 *           required:
 *             - userName
 *             - firstName
 *             - lastName
 *             - password
 *           properties:
 *             userName:
 *               type: string
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       201:
 *         description: Created
 */
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

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = router