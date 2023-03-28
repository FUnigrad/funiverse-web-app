import { CreateGroupPayload, Group, User } from '@types';
import axiosClient from './axiosClient';

export const groupApis = {
  getUserGroups: () => axiosClient.get<Group[]>('/group'),
  createUserGroup: (body: CreateGroupPayload) => axiosClient.post('/group', body),
  getUsersNotInGroup: (groupId: string) => axiosClient.get<User[]>(`user/group/none?id=${groupId}`),
};
