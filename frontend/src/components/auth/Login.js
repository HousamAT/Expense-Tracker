import React, { useState } from 'react';
import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import './Login.css';


function Login() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.signup(formData);
      alert('Sign up successful!');
    } catch (error) {
      alert('Sign up failed');
    }
  };
  
  const navigate = useNavigate()

  return (
    <div>
    <h2>Sign In</h2>
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit">Sign In</button>
    </form>
    
    <p>Don't have an account?</p>
    <button onClick={() => navigate('signup')}>Create Account</button>
  </div>
  );
}

export default Login;