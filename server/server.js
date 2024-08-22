require("dotenv").config();

//express app
const express = require("express");
const app = express();

//connect to db
const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI).catch((error) => {
  console.log(error);
});

const expressServer = app.listen(process.env.PORT, () => {
  console.log("listening on port", process.env.PORT);
});

//socket.io
const socketController = require("./src/controllers/socketController");
const { Server } = require("socket.io");
const io = new Server(expressServer, {
  cors: {
    origin: "http://localhost:3000"
  }
});

//socket controller
io.on("connection", (socket) => {
    console.log("new client connected: ", socket.id);
    socketController(socket, io);
  });

//route controllers
const roomRoutes = require("./src/routes/rooms");
const messageRoutes = require("./src/routes/messages");

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/room", roomRoutes);
app.use("/api/message", messageRoutes);
