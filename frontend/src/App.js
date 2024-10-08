import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import Dashboard from './components/Dashboard/Dashboard';

// Main application component
function App() {
  return (
    // Router component to enable routing in the application
    <Router>
      <Routes>
        {/* Route for the Sign Up page */}
        <Route path="/signup" element={<SignUp />} />
        
        {/* Route for the Login page (default route) */}
        <Route path="/" element={<Login />} />
        
        {/* Route for the Dashboard page */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
