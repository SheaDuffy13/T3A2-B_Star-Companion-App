import axios from 'axios';

console.log('environment: ', process.env.REACT_APP_API_ENDPOINT);

const api = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT || 'http://localhost:3001/',
  timeout: 5000,
//   withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
