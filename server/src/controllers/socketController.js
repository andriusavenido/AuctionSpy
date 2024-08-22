/* GAME LOGIC */
//io is server, socket is client 
module.exports = (socket, io) => {

    socket.on('disconnect', ()=>{
        console.log('Client disconnected:', socket.id);
    })
};