import axios from 'axios';
import qs from 'query-string';
import { appCookies } from 'utils';

const axiosClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
    credentials: 'include',
  },
  baseURL: 'http://api.dev.funiverse.world/api',
  paramsSerializer: { serialize: (params) => qs.stringify(params) },
});

axiosClient.interceptors.request.use(
  async (config) => {
    const accessToken = appCookies.getAccessToken();
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {},
);

axiosClient.interceptors.response.use(
  (response) => {
    // console.log('🚀 ~ response:', response);
    // if (response.data?.accessToken) accessToken = response.data.accessToken;
    return response?.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosClient;
