const express = require("express");
const todosRouter = require("./routes/todosRouter");
const userRouter = require("./routes/userRouter");
const cors = require("cors");
const todoController = require("./controllers/TodoController");
const app = express();
const mongoose = require("mongoose");
const Todo = require("./models/Todo");
const dotenv = require('dotenv');


dotenv.config({ path: './.env' });

// Connect to database
mongoose.connect(process.env.MONGO_REPLICA_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// Middleware to parse JSON data
app.use(express.json());

// 1. CORS Middleware (using CORS library)
const corsOptions = {
  origin: (origin, callback) => {
    console.log(`Origin: ${origin}`);
    if (origin === "http://localhost:4200") {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// use router for todos resource
app.use("/todos", todosRouter);

// User can read his todos
app.get(
  "/todos/all",
  /*verifyToken,*/ async (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // flush the headers to establish SSE with the client intead of waiting the body.
    /**
     *  res.flushHeaders() is used to immediately flush the HTTP response headers
     *  to the client. This is particularly useful in the context of Server-Sent Events (SSE)
     *  because it ensures that the headers are sent to the client right away,
     *  establishing the SSE connection promptly.
     *  In Node.js, headers are typically buffered until the first piece of the body
     *  is sent or the response is ended. By calling res.flushHeaders(), you force the headers 
     *  to be sent immediately without waiting for the body.
     */
    res.flushHeaders();

    const sendUpdatedTodos = async () => {
      try {
        const todos = await todoController.read(req);
        const message = `data: ${JSON.stringify(todos)}\n\n`;
        res.write(message);
      } catch (error) {
        const errorMessage = `event: error\ndata: ${JSON.stringify({ error: error.message })}\n\n`;
        res.write(errorMessage);
      }
    };

    sendUpdatedTodos();

    const changeStream = Todo.watch();

    // Listen for change events
    changeStream.on("change", async () => await sendUpdatedTodos());

    req.on("close", () => {
      console.log('Client disconnected');
      changeStream.close(); 
      res.end();
    });
  }
);

// use router for users resource
app.use("/users", userRouter);

app.listen(process.env.PORT, () => console.log("Server is 🏃"));

//   // Static files for client-side
//   app.use(express.static('public'));
