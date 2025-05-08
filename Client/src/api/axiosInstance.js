// src/api/axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add interceptors for auth, error handling, etc.
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle global errors here
    return Promise.reject(error);
  }
);

export default instance;
