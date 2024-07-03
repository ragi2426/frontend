import axios from 'axios';

console.log('API URL:', import.meta.env.VITE_APP_API_URL);

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL + '/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Login
export const loginService = async (username, password) => {
  try {
    const response = await apiClient.post('login/', { username, password });
    return response.data; 
  } catch (error) {
    console.log(error);
    throw handleError(error);
  }
};

// SignUp
export const signupService = async (username, password) => {
  // try {


  // } catch (error) {
  //   throw handleError(error);
  // }
};

// Helper function to handle errors
const handleError = (error) => {
  if (error.response) {
    return error.response.data; 
  } else if (error.request) {
    console.error('No response received:', error.request);
    return { error: 'No response received from server.' };
  } else {
    console.error('Error during request setup:', error.message);
    return { error: 'Error during request setup.' };
  }
};
