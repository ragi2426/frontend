import axios from 'axios';

// Create an instance of axios
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL + '/api/', // Adjust baseURL as needed
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', 
});

// Add a request interceptor
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = `${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor to handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const { data } = await axios.post('/api/token/refresh/', { refresh: refreshToken });
        localStorage.setItem('access_token', data.access);
        apiClient.defaults.headers.common['Authorization'] = `${data.access}`;
        originalRequest.headers['Authorization'] = `${data.access}`;
        return apiClient(originalRequest);
      } catch (err) {
        console.error('Token refresh error:', err);
          // Optionally handle the refresh token error (e.g., redirect to login)
          // Redirect to login or handle accordingly
        window.location.href = '/login'; 
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
