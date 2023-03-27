import axios from 'axios';
import qs from 'query-string';

let accessToken: string | null = null;

const axiosClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
    credentials: 'include',
  },
  baseURL: 'http://funiverse.world:30001',
  paramsSerializer: { serialize: (params) => qs.stringify(params) },
});
axiosClient.interceptors.request.use(
  async (config) => {
    console.log('🚀 ~ config:', config);
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {},
);
axiosClient.interceptors.response.use(
  (response) => {
    console.log('🚀 ~ response:', response);
    if (response.data?.accessToken) accessToken = response.data.accessToken;
    return response?.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosClient;
