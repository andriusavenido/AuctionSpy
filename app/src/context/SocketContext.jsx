import { createContext, useContext } from "react";

const SocketContext = createContext();

export const SocketProvider = ({children}) =>{

    return (
        <SocketContext.Provider>
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