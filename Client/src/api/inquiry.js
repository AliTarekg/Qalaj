import axios from './axiosInstance';

export const getInquiries = () => axios.get('/inquiries');
export const getInquiry = (id) => axios.get(`/inquiries/${id}`);
export const createInquiry = (data) => axios.post('/inquiries', data);
export const updateInquiry = (id, data) => axios.put(`/inquiries/${id}`, data);
export const deleteInquiry = (id) => axios.delete(`/inquiries/${id}`);