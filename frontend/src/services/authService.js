// Define the base API URL for authentication-related requests
const API_URL = 'http://localhost:5000/auth';

// Function to handle user signup
async function signup(data) {
  // Send a POST request to the signup API with the provided data
  const response = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // Convert data object to JSON string
  });

  // Check if the response is not OK
  if (!response.ok) {
    const errorData = await response.json(); // Parse error response from the backend
    throw new Error(errorData.error || 'Failed to sign up'); // Throw an error with the backend message or a default one
  }

  return response.json();
}

// Function to handle user signin
async function signin(data) {
  // Send a POST request to the signin API with the provided data
  const response = await fetch(`${API_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Include credentials for cross-origin requests
    body: JSON.stringify(data), // Convert data object to JSON string
  });

  // Check if the response is not OK
  if (!response.ok) {
    const errorData = await response.json(); // Parse error response from the backend
    throw new Error(errorData.error || 'Failed to sign in'); // Throw an error with the backend message or a default one
  }

  // Return the parsed response JSON on success
  return response.json();
}

// Export the signup and signin functions as default
export default { signup, signin };
