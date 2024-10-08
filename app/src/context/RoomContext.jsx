/* Context for accessing rooms */

import { useContext, useState, createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

const roomReducer =(state, action) =>{
    switch(action.type) {
        case 'SET_ROOMS':
            return {...state, rooms: action.payload}
        case 'ADD_ROOM':
            return {...state, rooms: [...state.rooms, action.payload]}
        case 'REPLACE_ROOM':
            const updatedRooms = state.rooms.map(room =>
                room._id === action.payload._id ? action.payload : room
            );
            return {...state, rooms: updatedRooms}

        default:
            return state
    }

}

const RoomContext = createContext();

export const RoomContextProvider = ({children}) =>{
    const [name, setName] = useState(null);
    const [activeRoom, setActiveRoom] = useState(null);
    
    const [state, dispatch] = useReducer(roomReducer,{
        rooms: []
    })

    useEffect( () =>{
        const fetchRooms = async () =>{
            try{
                const response = await fetch('/api/room');
                const data = await response.json();
                dispatch({type: 'SET_ROOMS', payload:data});
            }
            catch (err){
                dispatch({type: 'SET_ROOMS', payload:[]});
            }
        };

        fetchRooms();
    },[]);

    const addRoom = (newRoom) =>{
        if (newRoom.privacy !== 'private'){
             dispatch({type: 'ADD_ROOM', payload: newRoom});
        }
    }


    const useCreateRoom = () =>{
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);
        const navi = useNavigate();

        const createRoom = async (data) =>{
            setLoading(true);
            setError(null);
            
            try {
                const response = await fetch('/api/room',{
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                if (response.ok){
                    const newRoom = await response.json();
                    addRoom(newRoom);
                    setActiveRoom(newRoom);
                    navi("/room");
                    
                } else{
                    const errorData = await response.json();
                    setError (errorData.messsage || 'Failed to create room');
                }
            } catch(err){
                setError (err.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        return {
            createRoom,
            loading,
            error
        };
    }

    const useJoinRoom = () =>{
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);
        const navi = useNavigate();

        const joinRoom = async (id) =>{
            setLoading(true);
            setError(null);
            
            try {
                const response = await fetch('/api/room/' + id);
               
                if (response.ok){
                    const newRoom = await response.json();
                    setActiveRoom(newRoom);
                    //join room on socket

                    //redirection
                    navi("/room");
                } else{
                    const errorData = await response.json();
                    setError(errorData.error);
                }
            } catch(err){
                setError (err.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        return {
           joinRoom,
            loading,
            error
        };

    }

    const useUpdateRoom = () =>{
        const updateRoom = async (id, status, privacy) =>{
            try {

                const data = {status, privacy};
                const response = await fetch('api/room/'+id,{
                    method:'PATCH',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(data)
                })

                if (!response.ok){
                    throw new Error(response.status);
                }

                const updatedRoom = await response.json();

                dispatch({type: 'REPLACE_ROOM', payload: updatedRoom});
                setActiveRoom(updateRoom);


                
            } catch (err){
                console.log('Client sent update ',err);
            }
        }
        return {updateRoom};
    }

    return (
        <RoomContext.Provider value = {{name, setName, activeRoom, setActiveRoom, addRoom, state, useCreateRoom, useJoinRoom , useUpdateRoom}}>
            {children}
        </RoomContext.Provider>
    );
}

export const useRoomContext = () =>{
    const context = useContext(RoomContext);

    if (!context) {
        throw Error ('Error providing context');
    }

    return context;
}

