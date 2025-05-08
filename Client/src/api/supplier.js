import axios from './axiosInstance';

export const getSuppliers = () => axios.get('/suppliers');
export const getSupplier = (id) => axios.get(`/suppliers/${id}`);
export const createSupplier = (data) => axios.post('/suppliers', data);
export const updateSupplier = (id, data) => axios.put(`/suppliers/${id}`, data);
export const deleteSupplier = (id) => axios.delete(`/suppliers/${id}`);