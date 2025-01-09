import axios from 'axios';
import Cookies from "js-cookie";
import { URL } from './Env';

const API_URL = URL

// Create an axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
  
     const token = Cookies.get("token") 

     console.log(token)

    if (token) {
      // Set the Authorization header with the token
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Set Content-Type dynamically based on the request data
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }

    return config; // Return the modified config
  },
  (error) => Promise.reject(error) // Reject the promise on request error
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response, // Pass the response as is if no error
  (error) => {
    if (error.response?.status === 401) {
   console.log("heello")
    }

    return Promise.reject(error); // Reject the promise with the error
  }
);

export default axiosInstance;
