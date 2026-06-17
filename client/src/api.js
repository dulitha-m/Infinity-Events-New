import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api' });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('infinity_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getSegments = () => API.get('/segments');
export const getServices = () => API.get('/services');
export const getClients = (category) => API.get(`/clients${category ? `?category=${category}` : ''}`);
export const getHighlights = () => API.get('/highlights');
export const getStats = () => API.get('/stats');
export const getEvents = () => API.get('/events');
export const submitContact = (data) => API.post('/contact', data);

// Admin
export const adminLogin = (data) => API.post('/admin/login', data);
export const adminVerify = () => API.get('/admin/verify');
export const getDashboard = () => API.get('/admin/dashboard');
export const getContacts = (params) => API.get('/contact', { params });
export const updateContactStatus = (id, status) => API.patch(`/contact/${id}/status`, { status });
export const deleteContact = (id) => API.delete(`/contact/${id}`);

// CRUD helpers
export const createItem = (endpoint, data) => API.post(`/${endpoint}`, data);
export const updateItem = (endpoint, id, data) => API.put(`/${endpoint}/${id}`, data);
export const deleteItem = (endpoint, id) => API.delete(`/${endpoint}/${id}`);

export default API;
