import axios from './axiosInstance';

export const getInquiries = async () => {
  const res = await axios.get('/inquiries');
  return res.data;
};

export const getInquiry = async (id) => {
  const res = await axios.get(`/inquiries/${id}`);
  return res.data;
};

export const createInquiry = async (data) => {
  const res = await axios.post('/inquiries', data);
  return res.data;
};

export const updateInquiry = async (id, data) => {
  const res = await axios.put(`/inquiries/${id}`, data);
  return res.data;
};

export const deleteInquiry = async (id) => {
  const res = await axios.delete(`/inquiries/${id}`);
  return res.data;
};

export const getUsers = async () => {
  const res = await axios.get('/users');
  return res.data;
};

export const getFollowUps = async (inquiryId) => {
  const res = await axios.get(`/inquiries/${inquiryId}/follow-ups`);
  return res.data;
};

export const createFollowUp = async (inquiryId, data) => {
  const res = await axios.post(`/inquiries/${inquiryId}/follow-ups`, data);
  return res.data;
};
