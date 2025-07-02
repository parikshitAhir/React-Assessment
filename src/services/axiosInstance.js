import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const axiosInstance = axios.create({
  baseURL: 'https://node-product-distribution-backend.agiletechnologies.in/',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userInfo');
      window.location.href = '/admin/login'; 
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
