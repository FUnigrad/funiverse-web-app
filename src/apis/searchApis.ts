import { Post } from '@types';
import axiosClient from './axiosClient';
type SearchInParams = {
  value: string;
};
export const searchApis = {
  searchInWorkspace: (params: SearchInParams) =>
    axiosClient.get<any>('/search/workspace', { params }),
  searchInGroup: (groupId: string, params: SearchInParams) =>
    axiosClient.get<Post[]>(`/search/group/${groupId}`, { params }),
  searchInChat: (params: SearchInParams) => axiosClient.get<any>('/search/chat', { params }),
};
