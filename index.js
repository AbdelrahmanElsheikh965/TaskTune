const express = require('express');
const todosRouter = require('./routes/todosRouter');
const userRouter = require('./routes/userRouter');
const app = express();
const mongoose = require('mongoose');

// Connect to database
mongoose.connect('mongodb://127.0.0.1/REST-API',  { 
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
 })

// Middleware to parse JSON data
app.use(express.json());

// use router for todos resource
app.use('/todos', todosRouter)

// use router for users resource
app.use('/users', userRouter)

app.listen(3000)

    