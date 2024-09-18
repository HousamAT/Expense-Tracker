import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
function App() {
  // const [data, setData] = useState([{}])
  // useEffect(() => {
  //   fetch("/members").then(
  //     res => res.json()
  //   ).then(
  //     data => {
  //       setData(data);
  //       console.log(data);
  //     }
  //   )
  // }, [])

  // return (
  //   <div>
  //     {(typeof data.members === 'undefined') ? (
  //       <p>Loading ...</p>
  //     ) : (
  //       data.members.map((member, i) => (
  //         <p key={i}> {member}</p>
  //       ))

  //     )}


  //   </div>

  // )


    return (
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={< Login/>} />
        </Routes>
      </Router>
    );
  }

export default App
