/* GAME LOGIC */
//io is server, socket is client 

const itemList = require('../assets/ItemList.json');

function getRandomItem() {
    const index = Math.floor(Math.random() * itemList.items.length);

    return itemList.items[index];
}


module.exports = (socket, io) => {

    socket.on('disconnect', ()=>{
        console.log('Client disconnected:', socket.id);
    })
};
