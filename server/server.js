require('dotenv').config();

//express app
const express = require('express');
const app = express();

const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;

//route controllers
const roomRoutes = require('./src/routes/rooms')

//middleware
app.use(express.json());

//logging requests
app.use((req,res,next) =>{
    console.log(req.path,req.method);
    next();
})

//routes
app.use('/api/room',roomRoutes);

//socket controller

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