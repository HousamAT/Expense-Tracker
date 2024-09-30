import React, { useState } from 'react';
import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import './Login.css';


function Login() {
  const [formData, setFormData] = useState({
    username: '',
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
      
      const response = await authService.signin(formData);  
      localStorage.removeItem('username'); // Clears old  'username' key from localStorage
      localStorage.setItem('username', response.username); // Store new username in local Storage
      
      alert('Login successful!');
      navigate('/dashboard')

    } catch (error) {
      alert('Login failed');
    }
  };
  
  const navigate = useNavigate()

  return (
    <div className='login-container'>
    <h2>Sign In</h2>
    <form onSubmit={handleSubmit}>
      <input
        type="username"
        name="username"
        placeholder="User Name"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Sign In</button>
    </form>
    
    <p>Don't have an account?</p>
    <button onClick={() => navigate('signup')}>Create Account</button>
  </div>
  );
}

export default Login;