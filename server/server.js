require('dotenv').config();

//express app
const express = require('express');
const app = express();

//socket.io
const http = require('http');
const server = http.createServer(app);

const {Server} = require("socket.io");
const io = new Server(server);

const socketController = require('./src/controllers/socketController');

const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;

//route controllers
const roomRoutes = require('./src/routes/rooms');
const messageRoutes = require('./src/routes/messages');

//middleware
app.use(express.json());

//logging requests
app.use((req,res,next) =>{
    console.log(req.path,req.method);
    next();
})

//routes
app.use('/api/room',roomRoutes);
app.use('/api/message', messageRoutes);

//socket controller
io.on('conncetion', (socket) =>{

    console.log('new client connected: ', socket.id);

    socketController(socket,io);

    socket.on('disconnect', ()=>{
        console.log('Client disconnected:', socket.id);
    })
});

//connect to db
mongoose.connect(MONGODB_URI)
    .then(() =>{
        app.listen(process.env.PORT, () =>{
            console.log('Connected to db, listening on port', process.env.PORT)
        })
    })
    .catch((error)=>{
        console.log(error);
    })