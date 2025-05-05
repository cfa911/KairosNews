// utils/api.js
import axios from 'axios';

const API_URL = 'https://0edon-test.hf.space'; // Your API base URL
const API_TIMEOUT = 30000; // 30 seconds timeout
const ACCENT_COLOR = '#13ed8c'; // Matching your theme

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// POST request to /index
export const postData = async (query, topic, dateFrom, dateTo) => {
  try {
    const response = await api.post('/index', {
      query,
      topic,
      date: `${dateFrom} to ${dateTo}`,
    });

    return {
      success: true,
      data: response.data,
      sources: response.data.sources,
      status: response.status,
    };
  } catch (error) {
    return handleApiError(error);
  }
};

// GET request to /loading with polling
export const fetchResults = async (id, maxAttempts = 5, interval = 3000) => {
  try {
    let attempts = 0;
    
    const poll = async () => {
      attempts++;
      const response = await api.get(`/loading?id=${id}`);

      if (response.data.status === 'completed') {
        console.log('Polling completed:', response.data.sources);
        return {
          success: true,
          data: response.data,
          sources: response.data.sources,
          status: response.status,
        };
      }

      if (attempts >= maxAttempts) {
        return {
          success: false,
          error: 'Maximum polling attempts reached',
          status: 408,
        };
      }

      await new Promise(resolve => setTimeout(resolve, interval));
      return poll();
    };

    return await poll();
  } catch (error) {
    return handleApiError(error);
  }
};

// Centralized error handler
const handleApiError = (error) => {
  if (error.code === 'ECONNABORTED') {
    return {
      success: false,
      error: 'Request timeout',
      status: 408,
    };
  }

  if (error.response) {
    // Server responded with error status (4xx, 5xx)
    return {
      success: false,
      error: error.response.data?.detail || error.response.statusText,
      status: error.response.status,
    };
  }

  if (error.request) {
    // No response received
    return {
      success: false,
      error: 'No response from server',
      status: 503,
    };
  }

  // Other errors
  return {
    success: false,
    error: error.message || 'Unknown error occurred',
    status: 500,
  };
};

// Request cancellation
let cancelTokenSource = axios.CancelToken.source();

export const cancelRequests = () => {
  cancelTokenSource.cancel(`Operation canceled by user`);
  cancelTokenSource = axios.CancelToken.source(); // Reset token
};

// Add interceptors for consistent error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

// Add request interceptor to include cancel token
api.interceptors.request.use((config) => {
  config.cancelToken = cancelTokenSource.token;
  return config;
});