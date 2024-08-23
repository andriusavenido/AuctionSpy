import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
const TestSocket = () => {
    const {socket, session_id} = useSocketContext();

    useEffect(() =>{
        if (!socket) return;

        
    },[socket]);

    return ( <div className="testSocket">
        <p>socket: {session_id}</p>
    </div> );
}
 
export default TestSocket;