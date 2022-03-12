import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  timeoutErrorMessage: 'Server is down. Please try after sometime',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const updatedConfig = { ...config };
    const token = sessionStorage.getItem('@token');
    if (token) {
      const jsonToken: AuthResponse = JSON.parse(token);
      updatedConfig.headers = {
        ...(config.headers || {}),
        Authorization: `Bearer ${jsonToken.accessToken}`,
      };
    }
    return updatedConfig;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (value) => value,
  (error) => Promise.reject(error),
);

export default axiosInstance;
