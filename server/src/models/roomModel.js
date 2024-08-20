const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    name:{
        type: String,
        required:true,
    },
    participants:[String],
    status:{
        type: String,
        required:true,
    },
    privacy:{
        type: String,
        required:true
    }
}, { collection: 'rooms'});

module.exports = mongoose.model('room', roomSchema)