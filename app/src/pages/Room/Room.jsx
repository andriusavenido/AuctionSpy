import { useEffect, useState } from "react";
import { useRoomContext } from "../../context/RoomContext";
import { useSocketContext } from "../../context/SocketContext";
import styles from "./Room.module.css";
import useMessageHandler from "../../hooks/useMessageHandler";

const Room = () => {
  const { socket, session_id } = useSocketContext();
  const { name, activeRoom, setActiveRoom } = useRoomContext();
  const { messages, sendMessage } = useMessageHandler(socket, activeRoom._id, name);
  const [inputValue, setInputValue] = useState('');
 
  const [room, setRoom] = useState({
    _id: "",
    name: "",
    adminId: "",
    participants: [],
    status: "",
    privacy: "",
  });

  useEffect(() => {
    console.log(activeRoom);
    socket.emit('joinRoom', activeRoom._id, name);
    //join room on socket, validate, update rooms etc
    socket.on('roomUpdate', (newRoom) =>{
        setActiveRoom(newRoom);
    });
  }, []);

  useEffect(() => {
    if (activeRoom) {
      setRoom(activeRoom);
    }
  }, [activeRoom]);

  useEffect(() =>{
    console.log(messages);
  },[messages])

  const handleInputChange = (e) =>{
    setInputValue(e.target.value);
  }

  const handleSendMessage = () =>{
    if (inputValue){
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <div className={styles.details}>
          <h2>{room.name}</h2>
          <h3>Room Code: {room._id}</h3>
          <ul>
            <li>Participants: {room.participants.join(", ")}</li>
            <li>Status: {room.status}</li>
            <li>Privacy: {room.privacy}</li>
          </ul>
        </div>
        {session_id === room.adminId && (
          <div className={styles.controls}>this is admin page</div>
        )}
        <div className={styles.gameControls}></div>
      </div>
      <div className={styles.chat}>
        <div className={styles.chatMessages}>
          <ul>
            {messages.map( message => (
              <li className={styles.message} key={message._id}> {message.username} : {message.text} </li>
            ))}
          </ul>
        </div>
        <div className={styles.chatInput}>
          <input type="text" value = {inputValue} onChange={handleInputChange} placeholder="Send a message..."/>
          <button  onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Room;
