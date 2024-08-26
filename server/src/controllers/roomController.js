const Room= require('../models/roomModel');
const mongoose = require('mongoose');

//CRUD API

const room_create = async (req,res) =>{
    const {name, adminId, participants, status, privacy} =req.body;

    try{
        const room = await Room.create({name, adminId, participants, status, privacy});

        res.status(200).json(room);
    } catch (error){
        console.log(req.body);
        console.log(error);
        res.status(400).json({errror:error.message});
    }
}

const room_delete = async (req,res) =>{
    const {id} =req.params;

   
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such room'});
    }
    
    const room = await Room.findOneAndDelete({_id:id});

    if (!room){
        return res.status(404).json({error:'No such room exists'});
    }

    res.status(200).json({
        _id: room._id,
        mssg: "Room Deleted Sucessfully"
    });

}

const room_getById = async(req, res) =>{
    const{id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such room'});
    }

    const room = await Room.findById(id);

    if (!room){
        return res.status(404).json({error:'No such room'});
    }

    res.status(200).json(room);

}

const room_getAllPublic = async (req,res) =>{
    const rooms = await Room.find({ privacy: 'public'}).sort({createdAt: -1}); //sort rooms by latest

    res.status(200).json(rooms);
}

const room_updateById = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such room'});
    }

    const room = await Room.findOneAndUpdate({_id:id}, {...req.body});

    if (!room){
        return res.status(404).json({error:'No such room'});
    }

    res.status(200).json(room);
}

module.exports ={
    room_create,
    room_delete,
    room_getById,
    room_getAllPublic,
    room_updateById
}