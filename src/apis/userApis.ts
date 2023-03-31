import { UserMe } from '@types';
import axiosClient from './axiosClient';

export const userApis = {
  getMe: () => axiosClient.get<UserMe>('/user/me'),
};
