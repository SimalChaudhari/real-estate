import axios from 'axios';
// const BaseURL =  'http://localhost:5000/api';
const BaseURL = 'http://localhost:5000/api'

const axiosInstance = axios.create({
  // baseURL: process.env.BASE_URL || baseURL,
  baseURL: BaseURL,
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
