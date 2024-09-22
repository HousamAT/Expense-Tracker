import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import HomePage from './components/HomePage/HomePage';

function App() {

    return (
        <Router>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={< Login/>} />
            <Route path = "/homepage" element = {<HomePage/>}/>
          </Routes>
        </Router>
    );
  }

export default App
