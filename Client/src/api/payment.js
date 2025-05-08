import axios from './axiosInstance';

export const getPayments = () => axios.get('/payments');
export const getPayment = (id) => axios.get(`/payments/${id}`);
export const createPayment = (data) => axios.post('/payments', data);
export const updatePayment = (id, data) => axios.put(`/payments/${id}`, data);
export const deletePayment = (id) => axios.delete(`/payments/${id}`);