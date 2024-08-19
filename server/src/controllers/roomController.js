const Room= require('../models/roomModel');
const mongoose = require('mongoose');

const room_create = async (req,res) =>{
    const {name, participants} =req.body;

    try{
        const room = await Room.create({name,participants});

        res.status(200).json(room);
    } catch (error){
        res.status(400).json({errror:error.message})
    }
}

const room_delete = async (req,res) =>{

}

const room_getById = async(req, res) =>{

}

module.exports ={
    room_create,
    room_delete,
    room_getById
}