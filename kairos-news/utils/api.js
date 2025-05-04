// utils/api.js
import axios from 'axios';

const API_URL = 'https://0edon-test.hf.space'; // Replace with your actual API URL
const API_TIMEOUT = 30000; // 30 seconds timeout

// POST request to /index
export const postData = async (query, topic, dateFrom, dateTo) => {
  try {
    const response = await axios.post(
      `${API_URL}/index`,
      {
        query: query,
        topic: topic,
        date: `${dateFrom} to ${dateTo}`, // Format: "DD-MM-YYYY to DD-MM-YYYY"
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: API_TIMEOUT,
      }
    );

    return {
      success: true,
      data: response.data, // Should contain { id, status }
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.detail || 
            error.message || 
            'Failed to submit request',
    };
  }
};

// GET request to /loading (with polling)
export const fetchResults = async (id, maxAttempts = 10, interval = 3000) => {
  try {
    let attempts = 0;
    
    const poll = async () => {
      attempts++;
      const response = await axios.get(`${API_URL}/loading?id=${id}`, {
        timeout: API_TIMEOUT,
      });

      if (response.data.status === 'completed') {
        return {
          success: true,
          data: response.data,
        };
      }

      if (attempts >= maxAttempts) {
        return {
          success: false,
          error: 'Maximum polling attempts reached',
        };
      }

      // Wait before next attempt
      await new Promise(resolve => setTimeout(resolve, interval));
      return poll();
    };

    return await poll();
  } catch (error) {
    return {
      success: false,
      error: error.code === 'ECONNABORTED' 
            ? 'Request timeout' 
            : error.response?.data?.detail || error.message,
    };
  }
};

// Utility function to cancel requests
let cancelTokenSource = axios.CancelToken.source();

export const cancelRequests = () => {
  cancelTokenSource.cancel('Operation canceled by user');
  cancelTokenSource = axios.CancelToken.source(); // Reset for future requests
};