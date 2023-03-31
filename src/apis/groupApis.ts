import { CreateGroupPayload, CreateGroupPostPayload, Group, GroupType, Post, User } from '@types';
import axiosClient from './axiosClient';

export const groupApis = {
  getUserGroups: () => axiosClient.get<Group[]>('/group'),
  createUserGroup: (body: CreateGroupPayload) =>
    axiosClient.post('/group', { type: GroupType.Normal, ...body }),
  getUsersNotInGroup: (groupId: string) => axiosClient.get<User[]>(`user/group/none?id=${groupId}`),
  getGroupDetail: (groupId: string) => axiosClient.get<Group>(`/group/${groupId}`),
  //POST
  createGroupPost: ({ groupId, ...body }: CreateGroupPostPayload) =>
    axiosClient.post(`/group/${groupId}/post`, body),
  getGroupPosts: (groupId: string) => axiosClient.get<Post[]>(`/group/${groupId}/post`),
};
