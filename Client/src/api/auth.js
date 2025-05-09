// src/api/auth.js
import axios from './axiosInstance';
import Cookies from 'js-cookie';

export const login = async (email, password) => {
  const response = await axios.post('/auth/login', { email, password });
  if (response.data.token) {
    Cookies.set('token', response.data.token, { expires: 1 });
    Cookies.set('user', JSON.stringify(response.data.user), { expires: 1 });
  }
  return response.data;
};

export const register = async (userData) => {
  const response = await axios.post('/auth/register', userData);
  if (response.data.token) {
    Cookies.set('token', response.data.token, { expires: 1 });
    Cookies.set('user', JSON.stringify(response.data.user), { expires: 1 });
  }
  return response.data;
};

export const logout = async () => {
  try {
    await axios.post('/auth/logout');
  } finally {
    Cookies.remove('token');
    Cookies.remove('user');
  }
};

export const getCurrentUser = async () => {
  const response = await axios.get('/auth/profile');
  return response.data;
};

export const checkIsAdmin = async () => {
  try {
    await axios.get('/auth/check-admin');
    return true;
  } catch (error) {
    return false;
  }
};
