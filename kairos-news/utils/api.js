// apiService.js
const API_BASE_URL = 'https://0edon-kairosnews.hf.space';

export const createJob = async (postRequest) => {
  const response = await fetch(`${API_BASE_URL}/index`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(postRequest),
  });
  if (!response.ok) throw new Error('Job creation failed');
  return await response.json();
};
export const isJobCompletedOrFailed = async (jobId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/loading?id=${jobId}`);
    if (!response.ok) throw new Error('Failed to fetch job status');

    const data = await response.json();
    return data.status === 'completed' || data.status === 'failed'; // Check if the status is 'completed' or 'failed'
  } catch (error) {
    console.error('Error checking job status:', error);
    return false; // Return false in case of an error
  }
};

export const checkJobStatus = async (jobId) => {
  const response = await fetch(`${API_BASE_URL}/loading?id=${jobId}`);
  if (!response.ok) throw new Error('Status check failed');
  return await response.json();
};
