import { CreateGroupPayload, Group, GroupType, Post, User } from '@types';
import axiosClient from './axiosClient';
const posts: Post[] = [
  {
    content:
      '<p>Trong cuộc sống, chắc chắn ai cũng phải biết đến hương vị của tình yêu. Là một thứ gia vị của cuộc sống, vì thế, trải qua tình yêu là phải “nếm” cay đắng ngọt bùi, lúc vui, lúc buồn thì mới có thể tồn tại vĩnh cửu.</p>',
    ownerId: 1,
    groupId: 1,
  },
];
export const groupApis = {
  getUserGroups: () => axiosClient.get<Group[]>('/group'),
  createUserGroup: (body: CreateGroupPayload) =>
    axiosClient.post('/group', { type: GroupType.Normal, ...body }),
  getUsersNotInGroup: (groupId: string) => axiosClient.get<User[]>(`user/group/none?id=${groupId}`),
  getGroupDetail: (groupId: string) => axiosClient.get<Group>(`/group/${groupId}`),
  // getGroupPosts: (groupId: string) => axiosClient.get<Post[]>(`/group/${groupId}/posts`),
  getGroupPosts: (groupId: string) => posts,
};
