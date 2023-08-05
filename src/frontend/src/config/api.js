import axios from 'axios';

console.log('environment: ', process.env.REACT_APP_API_ENDPOINT);

const api = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT || 'http://localhost:3001/',
  // timeout: 5000,
//   withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// include JWT in the Authorization header of every request that requires authentication
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
