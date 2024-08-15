import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home/Home"
import Navbar from './components/Navbar/Navbar';
function App() {
  return (
    <Router>
     <Navbar></Navbar>
      <Routes>
        <Route path="/" element ={<Home/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
