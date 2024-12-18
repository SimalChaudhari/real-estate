import axios from 'axios';
const baseURL =  'http://localhost:5000/api';
// const baseURL = 'https://real-estate-nine-livid.vercel.app/api'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || baseURL,
  headers: {
    "Content-Type": "application/json"
  },
});

// Optional: Interceptors for requests or responses
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify config (e.g., add auth headers) before the request is sent
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global response errors
    return Promise.reject(error);
  }
);

export default axiosInstance;
