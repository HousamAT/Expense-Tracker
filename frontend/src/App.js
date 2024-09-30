import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import Dashboard from './components/Dashboard/Dashboard';

//this is how you use the icons
//import { dashboard, transactions, dollar } from './utils/Icons.js'; // Import specific icons
//import '@fortawesome/fontawesome-free/css/all.min.css'; // Importing Font Awesome


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
