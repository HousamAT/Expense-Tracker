import React, { useState } from 'react';
import authService from '../../services/authService'; // Import the authentication service
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook for navigation
import './Login.css'; // Import the CSS file for styling

// Define the Login component
function Login() {
  // Define the state for the login form data
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // Handle input changes and update the form data state
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // Dynamically update the field based on input name
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      // Send login request to the authentication service
      const response = await authService.signin(formData);

      // Clear any previous username in localStorage and set the new username
      localStorage.removeItem('username');
      localStorage.setItem('username', response.username);

      // Display success message and navigate to the dashboard
      alert('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      // Handle login errors by displaying an alert with the error message
      alert(error.message);
    }
  };

  // Initialize the useNavigate hook for redirection
  const navigate = useNavigate();

  return (
    <div className='login-container'>
      <h2>Sign In</h2>
      {/* Form for login */}
      <form onSubmit={handleSubmit}>
        <input
          type="username"
          name="username"
          placeholder="User Name"
          value={formData.username}
          onChange={handleChange} // Update form data on input change
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange} // Update form data on input change
          required
        />
        <button type="submit">Sign In</button>
      </form>

      {/* Link to sign up for new users */}
      <p>Don't have an account?</p>
      <button onClick={() => navigate('signup')}>Create Account</button>
    </div>
  );
}

export default Login;