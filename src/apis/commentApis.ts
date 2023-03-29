import { CreateCommentPayload, CreateGroupPayload, CreatePostPayload, Group, User } from '@types';
import axiosClient from './axiosClient';

export const commentApis = {
  createComment: (body: CreateCommentPayload) => axiosClient.post('/comment', body),
};
