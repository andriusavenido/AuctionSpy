import { useEffect, useRef, useState } from 'react';
import styles from './Home.module.css';
import { useRoomContext } from '../../context/RoomContext';
import RoomBox from '../../components/RoomBox/RoomBox';
import RoomForm from '../../components/RoomForm/RoomForm';

const Home = () => {
    const {name, setName, setActiveRoom} = useRoomContext();

    //reset state on mount
    useEffect(() =>{
        setActiveRoom(null);
        setName(null);
    },[])

    const [showRooms, setShowRooms] = useState(false);
    const inputRef = useRef(null);

    const {state} = useRoomContext();

    const handleSubmit =() =>{

        //allow button use with non blank name
        if (inputRef.current.value){
            setShowRooms(true);
        }
        
    }
    const handleInputChange =(e)=>{
        setName(e.target.value);
    }

    return ( <div className={styles.pageWrapper}>

    <div className={styles.wrapper}>
        {!showRooms && <>
            <h2>Greetings anonynmous bidder...</h2>
            <label htmlFor="">What is your code name?</label>
            <input type="text" className={styles.input} onChange={handleInputChange} ref={inputRef} placeholder='Name'/>
            <button onClick={handleSubmit}>Submit</button>
        </>}
        {showRooms &&<>
            <h3>Welcome <span className={styles.highlighted}>{name}</span>, choose an auction room:</h3>
            <div className={styles.roomList}>
                {state.rooms.map(singleRoom =>(
                    <RoomBox
                        key={singleRoom._id}
                        room = {singleRoom}
                    ></RoomBox>
                ))}

            </div>
        </>}
    </div> 
   {showRooms && <RoomForm></RoomForm>}
    </div>
    );
}

export default Home;