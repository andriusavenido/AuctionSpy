const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    username:{
        type: String,
        required:true,
    },
    room_id:{
        type: Number,
        required:true
    },
    text:{
        type: String,
        required:true,
    },
    session_id:{
        type: String,
        required:true
    }
}, {timestamps: true, collection: 'messages'});

module.exports = mongoose.model('message', messageSchema)