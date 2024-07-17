// import axios from 'axios';
import apiClient from '../interceptors/authInterceptor';
// console.log('API URL:', import.meta.env.VITE_APP_API_URL);

// const apiClient = axios.create({
//   baseURL: import.meta.env.VITE_APP_API_URL + '/api/',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

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
export const signupService = async (payload) => {
  try {
    const response = await apiClient.post('user/register/', payload);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Get Experience
export const getExperience = async () => {
  try {
    const response = await apiClient.get('user/experience/');
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Add Experience
export const addExperience = async (payload) => {
  try {
    const response = await apiClient.post('user/experience/', payload);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Update Experience
export const updateExperience = async (id, payload) => {
  try {
    const response = await apiClient.put(`user/experience/${id}/`, payload);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Delete Experience
export const deleteExperience = async (id) => {
  try {
    const response = await apiClient.delete(`user/experience/${id}/`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Get Education
export const getEducation = async () => {
  try {
    const response = await apiClient.get('user/education/');
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Add Education
export const addEducation = async (payload) => {
  try {
    const response = await apiClient.post('user/education/', payload);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Update Education
export const updateEducation = async (id, payload) => {
  try {
    const response = await apiClient.put(`user/education/${id}/`, payload);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Delete Education
export const deleteEducation = async (id) => {
  try {
    const response = await apiClient.delete(`user/education/${id}/`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Get TechStack
export const getTechStack = async () => {
  try {
    const response = await apiClient.get('user/techstack/');
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Add TechStack
export const addTechStack = async (payload) => {
  try {
    const response = await apiClient.post('user/techstack/', payload);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Update TechStack
export const updateTechStack = async (id, payload) => {
  try {
    const response = await apiClient.put(`user/techstack/${id}/`, payload);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Delete TechStack
export const deleteTechStack = async (id) => {
  try {
    const response = await apiClient.delete(`user/techstack/${id}/`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Get Certification
export const getCertification = async () => {
  try {
    const response = await apiClient.get('user/certification/');
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Add Certification
export const addCertification = async (payload) => {
  try {
    const response = await apiClient.post('user/certification/', payload);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Update Certification
export const updateCertification = async (id, payload) => {
  try {
    const response = await apiClient.put(`user/certification/${id}/`, payload);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Delete Certification
export const deleteCertification = async (id) => {
  try {
    const response = await apiClient.delete(`user/certification/${id}/`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
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
