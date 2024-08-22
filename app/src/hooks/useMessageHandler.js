import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";

const useMessageHandler = () => {
    const {socket, session_id} = useSocketContext();
    const [messages, setMessages] = useState([]);

    useEffect(()=>{
        
    },[])

    const sendMessage = (text) =>{

    }
    return ( {messages, sendMessage} );
}
 
export default useMessageHandler;