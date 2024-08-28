import { useRoomContext } from "../../context/RoomContext";
import styles from "./RoomBox.module.css";

const RoomBox = ({ room }) => {
  const { _id, name, participants, status, createdAt } = room;
  const {useJoinRoom} = useRoomContext();
  const  {joinRoom} = useJoinRoom();

  const handleSubmit = async () =>{
    //join room
    await joinRoom(_id);
  }
  return (
    <div className={styles.roombox}>
      <h3 className={styles.roomName}>{name}</h3>
      <div className={styles.details}>
        <p>Participants: {participants.length}</p>
        <p className={status === "open" ? styles.open : styles.closed}>
          Status: {status}
        </p>
        <p>{createdAt}</p>
        <button disabled={status==="open"? false:true} onClick={handleSubmit}>{status==="open"? 'Join':''}</button>
      </div>
    </div>
  );
};

export default RoomBox;
