import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home/Home"
import Navbar from './components/Navbar/Navbar';
import Guide from './pages/Guide/Guide';
import Credits from './pages/Credits/Credits';
import Feedback from './pages/Feedback/Feedback'
function App() {
  return (
    <Router>
     <Navbar></Navbar>
      <Routes>
        <Route path="/" element ={<Home/>}></Route>
        <Route path="/guide" element ={<Guide/>}></Route>
        <Route path="/credits" element ={<Credits/>}></Route>
        <Route path="/feedback" element ={<Feedback/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
