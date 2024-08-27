/* GAME LOGIC */
//io is server, socket is client 
const Room= require('../models/roomModel');
const itemList = require('../assets/ItemList.json');

function getRandomItem() {
    const index = Math.floor(Math.random() * itemList.items.length);

    return itemList.items[index];
}


module.exports = (socket, io) => {

    socket.on('joinRoom', async (room_id, name) =>{
        try{
            const room = await Room.findById(room_id);
            if (room){
                //add participant to room
                room.participants.push(name);
                await room.save();


                socket.join(room_id);
                io.to(room_id).emit('roomUpdate', room);
                
            }
            else{
                socket.emit('error', 'An error occured');
            }
        } catch(err){
            console.log('join room error', err)
            socket.emit('error', 'An error occured');
        }
    });

    socket.on('disconnect', ()=>{
        console.log('Client disconnected:', socket.id);
    })
};
