import axios from 'axios';

// Use your environment variable or fallback to localhost
// const baseURL =  'http://localhost:5000/api';

const baseURL = 'https://real-estate-nine-livid.vercel.app/api'

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
