import { CreateGroupPayload, CreatePostPayload, Group, User } from '@types';
import axiosClient from './axiosClient';

export const postApis = {
  createPost: (body: CreatePostPayload) => axiosClient.post('/post', body),
};
