import React, { useState } from 'react';
import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

function SignUp() {
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
      const response = await authService.signup(formData);
      localStorage.removeItem('username'); // Clears old  'username' key from localStorage
      localStorage.setItem('username', response.username); // Store new username in local Storage

      alert('Sign up successful!');
      navigate('/dashboard')
    } catch (error) {
      alert(error.message);
    }
  };

  const navigate = useNavigate()

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
