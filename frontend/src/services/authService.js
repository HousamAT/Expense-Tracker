// src/services/authService.js

// export const API_URL = import.meta.env.MODE === 'development' ? 'http://127.0.0.1:5000/auth' : '/auth';
export const API_URL = '/auth';


async function signup(data) {
  const response = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to sign up');
  }
  return response.json();
}

async function signin(data) {
  console.log('Signing in');
  const response = await fetch(`${API_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', 
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to sign in');
  }

  return response.json();
}

export default { signup, signin };
