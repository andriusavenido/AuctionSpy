import { useEffect, useState } from "react";

const useMessageHandler = (socket, room_id, username) => {
    const [messages, setMessages] = useState([]);

    useEffect(()=>{
        socket.on('roomMessage', (msg) =>{
            setMessages( (prev) =>[
                ...prev,
                msg
            ]);
        })
    },[])

    const sendMessage = (text) =>{
        const message = {
            username: username,
            room_id: room_id,
            text: text,
            session_id: socket.id
        };

        console.log('emitting')

        socket.emit('roomMessage', message);
    }
    return ( {messages, sendMessage} );
}
 
export default useMessageHandler;