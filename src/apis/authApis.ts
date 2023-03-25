import { LoginBody, LoginResponse, VerifyEmailBody, VerifyEmailResponse } from '@types';
import axiosClient from './axiosClient';

export const authApis = {
  verifyEmail: (body: VerifyEmailBody) =>
    axiosClient.post<VerifyEmailResponse>('/oauth/verify-mail', body),
  login: (body: LoginBody) => axiosClient.post<LoginResponse>('/oauth/login', body),
  // logout: (body: ) => axiosClient.post('/api/v1/auth/logout'),
  refreshToken: () => axiosClient.post('/oauth/refresh-token'),
  // verifyWorkspace: (subdomain: string) =>
  //   axiosClient.get(`/api/workspace/is-exist?domain=${subdomain}`),
};
