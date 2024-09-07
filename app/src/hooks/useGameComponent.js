import { useEffect, useState } from "react";

const useGameComponent = (socket, room_id) => {
    const [timer, setTimer] = useState(0);
    const [gameStart, setGameStart] = useState(false);
    const [gameState, setGameState] = useState({});

    useEffect(()=>{

        socket.on('receiveGameState', (game)=>{
            setGameState(game);
        });

        socket.on('timerUpdate', (timeLeft)=>{
            setTimer(timeLeft);
        });

        socket.on('timerEnd', () =>{

        });
    },[]);

    const startGame = () =>{
        socket.emit('startGameState', room_id);// call socket to create game state
        setGameStart(true);
    }


    return ( { gameStart, gameState, timer, startGame });
}
 
export default useGameComponent;