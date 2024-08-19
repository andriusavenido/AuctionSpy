const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    name:{
        type: String,
        required:true,
    },
    participants:[String]
}, { collection: 'rooms'});

module.exports = mongoose.model('room', messageSchema)