import { useState } from "react";
import styles from "./RoomForm.module.css";
import { useRoomContext } from "../../context/RoomContext";
import { useSocketContext } from "../../context/SocketContext";

const RoomForm = () => {
  const { name, useCreateRoom } = useRoomContext();
  const { createRoom, loading, error } = useCreateRoom();
  const { session_id } = useSocketContext();
  const [data, setData] = useState({
    name: "",
    adminId: session_id,
    participants: [name],
    status: "open",
    privacy: "public",
  });

  const [roomCode, setRoomCode] = useState("");

  const handleChange = (e) => {
    const { name: fieldName, value } = e.target;

    setData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createRoom(data);
  };

  const handleRoomCode = (e) => {
    setRoomCode(e.target.value);
  };

  const handleJoin = async (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.wrapper}>
      <h3>Create Room</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Room Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={data.name}
            onChange={handleChange}
            required
            className={styles.input}
          ></input>
        </div>
        <div>
          <label htmlFor="privacy">Privacy:</label>
          <select >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        <button className={styles.button} type="submit">Create</button>
      </form>

      <h3>Join a room</h3>

      <div className={styles.roomCode}>
        <form onSubmit={handleJoin}>
          <label htmlFor="roomCode">Room Code:</label>
          <input
            type="text"
            id="roomCode"
            value={roomCode}
            onChange={handleRoomCode}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Submit</button>
        </form>
      </div>

    </div>
  );
};

export default RoomForm;
