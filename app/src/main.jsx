import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RoomContextProvider } from './context/RoomContext.jsx'

createRoot(document.getElementById('root')).render(
    <RoomContextProvider>
        <App />
    </RoomContextProvider>
       
)
