import React from 'react';
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
