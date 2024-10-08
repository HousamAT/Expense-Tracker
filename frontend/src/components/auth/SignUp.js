import React, { useState } from 'react';
import authService from '../../services/authService'; // Import the authentication service
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook for navigation
import './SignUp.css'; // Import the CSS file for styling

// Define the SignUp component
function SignUp() {
  // Define the state for the signup form data
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
      // Send signup request to the authentication service
      const response = await authService.signup(formData);

      // Clear any previous username in localStorage and set the new username
      localStorage.removeItem('username');
      localStorage.setItem('username', response.username);

      // Display success message and navigate to the dashboard
      alert('Sign up successful!');
      navigate('/dashboard');
    } catch (error) {
      // Handle signup errors by displaying an alert with the error message
      alert(error.message);
    }
  };

  // Initialize the useNavigate hook for redirection
  const navigate = useNavigate();

  return (
    <div className="signup-container">
      {/* Form for user signup */}
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
