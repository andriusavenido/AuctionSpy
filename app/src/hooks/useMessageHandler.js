import { useEffect, useState } from "react";
import { useSocketContext } from "../context/SocketContext";
import { useRoomContext } from "../context/RoomContext";

const useMessageHandler = () => {
    const {socket, session_id} = useSocketContext();
    const {activeRoom} = useRoomContext();
    const [messages, setMessages] = useState([]);

    useEffect(()=>{
        socket.on('message', (msg) =>{
            console.log(msg);
        })
    },[])

    const sendMessage = (text) =>{
        const message = {
        };
    }
    return ( {messages, sendMessage} );
}
 
export default useMessageHandler;