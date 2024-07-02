const express = require('express');
const todosRouter = require('./routes/todosRouter');
const userRouter = require('./routes/userRouter');
const cors = require('cors')
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

// 1. CORS Middleware (using CORS library)
// const corsOptions = {
//     origin: (origin, callback) => {
//         console.log(`Origin: ${origin}`);
//         if (origin === 'http://localhost:4200') {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     optionsSuccessStatus: 200
// };
// app.use(cors(corsOptions));

// 2. Custom CORS Middleware (Manual)
app.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:4200'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        console.log(`origin: ${origin}`);
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        next();
    }else{
        throw new Error("Bad Origin", origin)
    }
});



// use router for todos resource
app.use('/todos', todosRouter)

// use router for users resource
app.use('/users', userRouter)

app.listen(3000, () => console.log("Server is 🏃"))

    