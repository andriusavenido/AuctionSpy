import { useRoomContext } from "../../context/RoomContext";
import { useSocketContext } from "../../context/SocketContext";
import styles from "./Room.module.css";

const Room = () => {
    const {socket, session_id} = useSocketContext();
    const {name, activeRoom} = useRoomContext();

    
    return ( 
    <div className={styles.wrapper}>

    </div> 
    );
}
 
export default Room;