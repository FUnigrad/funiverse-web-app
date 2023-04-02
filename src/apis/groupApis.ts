import {
  CreateGroupPayload,
  CreateGroupPostPayload,
  Curriculum,
  CurriculumSyllabus,
  Group,
  GroupType,
  GroupUser,
  Post,
  User,
} from '@types';
import axiosClient from './axiosClient';

export const groupApis = {
  getUserGroups: () => axiosClient.get<Group[]>('/group'),
  createUserGroup: (body: CreateGroupPayload) =>
    axiosClient.post('/group', { type: GroupType.Normal, ...body }),
  getUsersNotInGroup: (groupId: string) =>
    axiosClient.get<GroupUser[]>(`user/group/none?id=${groupId}`),
  getGroupDetail: (groupId: string) => axiosClient.get<Group>(`/group/${groupId}`),
  //POST
  createGroupPost: ({ groupId, ...body }: CreateGroupPostPayload) =>
    axiosClient.post(`/group/${groupId}/post`, body),
  getGroupPosts: (groupId: string) => axiosClient.get<Post[]>(`/group/${groupId}/post`),

  //USER
  getGroupUsers: (groupId: string) => axiosClient.get<GroupUser[]>(`/group/${groupId}/users`),
  addGroupUsers: (groupId: string, userIds: number[]) =>
    axiosClient.post(`/group/${groupId}/members`, userIds),

  // Academic
  getGroupAcademic: (groupId: string) => axiosClient.get<Curriculum>(`/group/${groupId}/academic`),
  getGroupAcademicSyllabus: (curriculumId: string) =>
    axiosClient.get<CurriculumSyllabus>(`/curriculum/${curriculumId}/syllabus`),
};
