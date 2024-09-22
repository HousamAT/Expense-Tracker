// src/services/authService.js

const API_URL = 'http://localhost:5000/auth';

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
  const response = await fetch(`${API_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to sign in');
  }
  return response.json();
}

export default { signup, signin };