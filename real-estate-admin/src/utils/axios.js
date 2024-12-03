import axios from 'axios';

import { CONFIG } from 'src/config-global';

const axiosInstance = axios.create({ baseURL: CONFIG.site.serverUrl });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong!')
);

export default axiosInstance;

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
};

export const endpoints = {
  auth: {
    me: '/api/auth/me',
    signIn: '/api/auth/login',
    signUp: '/api/auth/sign-up',
  },
  template: {
    getAll: '/api/templates', // Fetch all templates
    getById: '/api/templates', // Fetch template by ID
    create: '/api/templates/create', // Create a new template
    update: '/api/templates', // Update template by ID
    delete: '/api/templates', // Delete template by ID
  },
  settings_custom_fields: {
    getAll: '/api/settings/custom-fields',
    getById: '/api/settings/custom-fields',
    create: '/api/settings/custom-fields',
    update: '/api/settings/custom-fields',
    delete: '/api/settings/custom-fields',
  },
  settings_api: {
    getAll: '/api/settings/api-connection',
    getById: '/api/settings/api-connection',
    create: '/api/settings/api-connection',
    update: '/api/settings/api-connection',
    delete: '/api/settings/api-connection',
  },
};
