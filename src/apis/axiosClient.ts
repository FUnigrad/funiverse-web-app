import { Callback } from '@types';
import axios, { AxiosError } from 'axios';
import qs from 'query-string';
import { DecodedToken, appCookies } from 'utils';

const axiosClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
    // withCredentials: true,
    // credentials: 'include',
  },
  baseURL: undefined,
  paramsSerializer: { serialize: (params) => qs.stringify(params) },
});
let isRefreshing = false;
let failedQueue: { resolve: Callback; reject: Callback }[] = [];
function processQueue(error: any, token: string | null = null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
}

axiosClient.interceptors.request.use(
  async (config) => {
    const accessToken = appCookies.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      if (!config.baseURL) {
        const tokenData = appCookies.getDecodedAccessToken() as DecodedToken;
        const workspace = tokenData.domain.split('.')[0];
        const baseURL = `http://api.${workspace}.funiverse.world`;
        axiosClient.defaults.baseURL = baseURL;
        config.baseURL = baseURL;
      }
    }
    return config;
  },
  (error) => {},
);

axiosClient.interceptors.response.use(
  (response) => {
    isRefreshing = false;
    if (failedQueue.length > 0) {
      const token = appCookies.getAccessToken();
      processQueue(null, token);
    }
    return response?.data;
  },
  (error: AxiosError) => {
    switch (error.response?.status) {
      case 401:
        return handle401Error(error);
      default:
        return Promise.reject(error);
    }
  },
);

export default axiosClient;

async function handle401Error(error: AxiosError) {
  const originalRequest = error.request;
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    }).then(() => {
      return axiosClient.request(originalRequest);
    });
  }

  isRefreshing = true;
  const refreshToken = appCookies.getRefreshToken();

  const baseAuth = 'http://authen.system.funiverse.world/auth/refresh-token';
  const { accessToken } = await axios.post<{ accessToken: string }>(baseAuth, { refreshToken });

  appCookies.setAccessToken(accessToken);

  processQueue(null, null);

  originalRequest.headers.Authorization = `Bearer ${accessToken}`;
  return axiosClient.request(originalRequest);
}
