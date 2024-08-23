/* Context for accessing rooms */

import { useContext, useState, createContext, useEffect, useReducer } from "react";

const roomReducer =(state, action) =>{
    switch(action.type) {
        case 'SET_ROOMS':
            return {...state, rooms: action.payload}
        case 'ADD_ROOM':
            return {...state, rooms: [...state.rooms, action.payload]}
        default:
            return state
    }

}

const RoomContext = createContext();

export const RoomContextProvider = ({children}) =>{
    const [name, setName] = useState(null);
    
    const [state, dispatch] = useReducer(roomReducer,{
        rooms: []
    })

    useEffect( () =>{
        const fetchRooms = async () =>{
            try{
                const response = await fetch('/api/room');
                const data = await response.json();
                dispatch({type: 'SET_ROOMS', payload:data});
                console.log(data);
            }
            catch (err){
                dispatch({type: 'SET_ROOMS', payload:[]});
            }
        };

        fetchRooms();
    },[]);

    const addRoom = (newRoom) =>{
        dispatch({type: 'ADD_ROOM', payload: newRoom});
    }

    return (
        <RoomContext.Provider value = {{name, setName, addRoom, state}}>
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