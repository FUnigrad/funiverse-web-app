import { CreateGroupPayload, Group, GroupType, Post, User } from '@types';
import axiosClient from './axiosClient';
const posts: Post[] = [
  {
    content:
      '<p><span class="mention" data-index="0" data-denotation-char="@" data-id="1" data-value="Fredrik Sundqvist">﻿<span contenteditable="false"><span class="ql-mention-denotation-char">@</span>Fredrik Sundqvist</span>﻿</span> test</p>',
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
