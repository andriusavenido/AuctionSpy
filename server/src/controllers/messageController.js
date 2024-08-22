const Message = require('../models/messageModel');
const mongoose = require('mongoose');


const message_getAll = async (req,res) =>{
    const messages = await Message.find({});

    res.status(200).json(messages);
}

const message_getByRoom = async (req, res) =>{
    const {room_id} = req.params;

    const messages = await Message.find({room_id: room_id}).sort({createdAt: -1});

    if (messages.length === 0){
        return res.status(404).json({error:'No such message'});
    }

    res.status(200).json(messages);
}

const message_getByUser = async (req, res) =>{

    const {session_id} = req.params;

    const messages = await Message.find({session_id:session_id}).sort({createdAt: -1});

    if (messages.length === 0){
        return res.status(404).json({error:'No such message'});
    }

    res.status(200).json(messages);

}

const message_create = async (req,res) =>{
    const {username, room_id, text, session_id} = req.body;

    try{
        const message = await Message.create({username, room_id, text, session_id});

        res.status(200).json(message);
    } catch (error){
        res.status(400).json({errror:error.message});
    }
}

const message_delete = async (req, res) =>{
    const {id} =req.params;

   
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such message'});
    }
    
    const message = await Message.findOneAndDelete({_id:id});

    if (!message){
        return res.status(404).json({error:'No such message exists'});
    }

    res.status(200).json({
        _id: message._id,
        mssg: "Message Deleted Sucessfully"
    });
}

module.exports ={
    message_create,
    message_delete,
    message_getAll,
    message_getByRoom,
    message_getByUser
}