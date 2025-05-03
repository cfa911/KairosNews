// utils/api.js
import axios from 'axios';

const API_URL = 'https://0edon-test.hf.space';

export const postData = async (query, topic, dateFrom, dateTo) => {
  try {
    const response = await axios.post(`${API_URL}/index`, {
      query,
      topic,
      date: `${dateFrom} to ${dateTo}`,
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.detail || error.message 
    };
  }
};

export const fetchResults = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/loading?id=${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};