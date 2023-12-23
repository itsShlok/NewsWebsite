import './App.css';
import  Home from './components/Home.js'
import  About from './components/About.js'
import  Navbar from './components/Navbar.js'
import NoteState from './context/notes/NoteState.js'
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import Alert from './components/Alert.js';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import {
//   createBrowserRouter,
//   RouterProvider, 
// } from "react-router-dom";

function App() {
  // const [alert,setAlert]=useState(null);
  // const showAlert=(message)=>{
  //   setAlert({
  //     msg:message
  //   })
  //   setTimeout(()=>{
  //     setAlert(null)
  //   },1500)
  // }
  // const router = createBrowserRouter([
  //   {
  //     element: (
  //       <div>
  //         <Navbar />
  //         <Alert style={{ marginTop: '10px' }}/>
  //       </div>
  //     ),
  //     children:[ {element:<Alert/>} , 
  //       {  path: "/", element:<Home showAlert={showAlert}/>},    
  //       {  path:"/About", element:<About/>},
  //       {  path:"/Login", element:<Login showAlert={showAlert}/>},    
  //       {  path:"/Signup", element:<Signup showAlert={showAlert}/>},        
  //     ]
  //   }   
  // ]);        
  return (
    <>
    <NoteState>

     {/* <RouterProvider router={router}/> */}
     {/* <Alert message={"hey Hello there"}/> */}
     <Router>
      <div>
        <Navbar />
        {/* <Alert /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
     </NoteState>
</>
  );
}

export default App;
