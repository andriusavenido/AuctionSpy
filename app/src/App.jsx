import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home/Home"
import Navbar from './components/Navbar/Navbar';
import Guide from './pages/Guide/Guide';
import Credits from './pages/Credits/Credits';
import Feedback from './pages/Feedback/Feedback'

import Room from './pages/Room/Room.jsx'
import { SocketProvider } from './context/SocketContext.jsx'
import { useRoomContext } from './context/RoomContext.jsx';


function App() {
  const {name, activeRoom} = useRoomContext(); //protect room route
  
  
  return (
    <Router>
     <Navbar></Navbar>
     
      <Routes>
        <Route path="/guide" element ={<Guide/>}></Route>
        <Route path="/credits" element ={<Credits/>}></Route>
        <Route path="/feedback" element ={<Feedback/>}></Route> 
        <Route path="/" element ={<SocketProvider><Home/></SocketProvider>}></Route>
        <Route path="/room" element ={ <SocketProvider><Room/></SocketProvider> }></Route>
        
      </Routes>
    
      <hr />
    </Router>
  )
}

export default App
