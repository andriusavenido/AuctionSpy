/* GAME LOGIC */
//io is server, socket is client 
const Room= require('../models/roomModel');
const itemList = require('../assets/ItemList.json');

function getRandomItem() {
    const index = Math.floor(Math.random() * itemList.items.length);

    return itemList.items[index];
}

//keep track of users name and session key, to remove them on disconnect
const usersInRooms ={
    users:[],
    setUsers: function (newArray) {
        this.users= newArray;
    }
}


module.exports = (socket, io) => {

    socket.on('joinRoom', async (room_id, name) =>{
        try{
            const room = await Room.findById(room_id);
            if (room){
                //add participant to room
                enterUser(room_id, name, socket.id);

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

    socket.on('disconnect', async ()=>{
        console.log('Client disconnected:', socket.id);

        const user = usersInRooms.users.find( user => user.session_id === socket.id);

        //remove user from room
        if (user) {
            try{
                const room = await Room.findById(user.room_id); 
                if (room){
                    room.participants = room.participants.filter(username => username !==user.name);
                    await room.save();
                    io.to(user.room_id).emit('roomUpdate', room);

                    removeUser(socket.id);
                }
            } catch(err){
                console.log('error removing user from room: ', err);
            }
        }
    })
};


//userInRooms functions
function enterUser(room_id, name, session_id){
    const user = { room_id, name, session_id};

    usersInRooms.setUsers([
        ...usersInRooms.users.filter(user => user.session_id !== session_id),
        user
    ]);

}

function removeUser(session_id){
    usersInRooms.setUsers(
        usersInRooms.users.filter( user => user.session_id !== session_id)
    );
}

function getUser(session_id){
    usersInRooms.users.find( user => user.session_id === session_id);
}