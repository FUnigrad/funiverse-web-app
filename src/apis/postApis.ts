import { CreatePostCommentPayload, CreateGroupPayload, Group, User, Comment } from '@types';
import axiosClient from './axiosClient';

export const postApis = {
  // createPost: (body: CreatePostPayload) => axiosClient.post('/post', body),
  // getPostComments: (postId: string) => axiosClient.get<Comment[]>(`/post/${postId}/comments`),
  createPostComment: ({ postId, ...body }: CreatePostCommentPayload) =>
    axiosClient.post<Comment>(`/post/${postId}/comment`, body),
  getPostComments: (postId: string) => axiosClient.get<Comment[]>(`/post/${postId}/comment`),
};
