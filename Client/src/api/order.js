import axios from './axiosInstance';

export const getOrders = () => axios.get('/orders');
export const getOrder = (id) => axios.get(`/orders/${id}`);
export const createOrder = (data) => axios.post('/orders', data);
export const updateOrder = (id, data) => axios.put(`/orders/${id}`, data);
export const deleteOrder = (id) => axios.delete(`/orders/${id}`);