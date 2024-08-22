import { createContext, useContext, useEffect,  useState } from "react";
import {io} from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({children}) =>{
    const [socket, setSocket] = useState(null);
    const [session_id, setSessionId] = useState(null);

    useEffect(() =>{
        const socketIo = io('http://localhost:4000');

        setSocket(socketIo);

        socketIo.on("connect", () => {
            setSessionId(socketIo.id);
        });

        return () =>{
            socketIo.disconnect();
        };

    },[]);
    return (
        <SocketContext.Provider value = {{socket, session_id }}>
            {children}
        </SocketContext.Provider>
    );
}

export const useSocketContext = () =>{
    const context = useContext(SocketContext);

    if (!context) {
        throw Error ('Error providing context');
    }

    return context;
}