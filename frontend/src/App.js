// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import SignUp from './components/auth/SignUp';
// import Login from './components/auth/Login';
// import Dashboard from './components/Dashboard/Dashboard';
// import Buget from './components/Buget'; 
// import { AddTransaction } from './components/AddTransaction';
// function App() {

//     return (
//         <Router>
//           <Routes>
//             <Route path="/signup" element={<SignUp />} />
//             <Route path="/" element={< Login/>} />
//             <Route path = "/dashboard" element = {<Dashboard/>}/>
//             <Route path = "/Buget" element = {<Buget/>}/>
//             <Route path = "/s" element = {<AddTransaction/>}/>
//           </Routes>
//         </Router>
//     );
//   }

// export default App



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import Dashboard from './components/Dashboard/Dashboard';

function App() {

      return (
        <Router>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={< Login/>} />
            <Route path = "/dashboard" element = {<Dashboard/>}/>
          </Routes>
        </Router>
    );
  }

export default App
