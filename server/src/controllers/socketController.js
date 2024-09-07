/* GAME LOGIC */
//io is server, socket is client 
const Room= require('../models/roomModel');
const Message = require('../models/messageModel')
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

const gameStates ={
    games:[],
    setGames: function (newArray){
        this.users = newArray;
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

    socket.on('roomMessage', async (message)=>{
        try{
            const savedMessage = await Message.create(message);

            if (savedMessage){
                io.to(message.room_id).emit('roomMessage',savedMessage);
            }

        } catch(err){
            console.log('message send error:',err);
            socket.emit('error', 'An error occured sending message');
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

                    if (room.participants.length ===0){ //delete room and messages
                        await Room.findOneAndDelete(user.room_id);
                        await Message.deleteMany({room_id: room_id});
                    }

                    removeUser(socket.id);
                }
            } catch(err){
                console.log('error removing user from room: ', err);
            }
        }
    });

    socket.on('startGameState', (room_id) =>{
        createGameState(room_id);
        socket.emit('receiveGameState', getGameState(room_id));
        //send gamestate to client
    });

    function createGameState(room_id){
        const item = getRandomItem();
        const users =  getUsersInRoom(room_id);
        const spy = users[Math.floor(Math.random()*users.length)];
    
        const gameState = {
            room_id,
            remainingTime: 360,
            spy: spy,
            item: item,
            timer: function(){
                const timer = setInterval(() =>{
                    if(gameState.remainingTime >0){
                        gameState.remainingTime--;
                        io.to(room_id).emit('timerUpdate', gameState.remainingTime);
                    }else{
                        clearInterval(timer);
                        io.to(room_id).emit('timerEnd');
                    }
                },1000)
            }
        };

        //add this to gamestates
        gameStates.setGames(
            ...gameStates.games.filter(game => game.room_id !== room_id),
            gameState
        );
    
    }
};


function endGameState(room_id){
    gameStates.setGames(
        gameStates.gamesfilter( game => game.room_id !== room_id)
    );
}

function getGameState(room_id){
    gameStates.games.find(game => game.room_id === room_id);
}

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

function getUsersInRoom(room_id){
    return usersInRooms.users.filter( user => user.room_id === room_id);
}

function getUser(session_id){
    usersInRooms.users.find( user => user.session_id === session_id);
}