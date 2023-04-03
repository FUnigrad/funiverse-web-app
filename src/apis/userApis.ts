import { Event, UserMe } from '@types';
import axiosClient from './axiosClient';

export const userApis = {
  getMe: () => axiosClient.get<UserMe>('/user/me'),
  getUsers: () => axiosClient.get('/workspace/user'),
  getUserEvents: (params: { unread?: boolean } = {}) =>
    axiosClient.get<Event[]>('/user/event', { params }),
  // Event
  updateEvent: (eventId: string | number, body: { read: boolean }) =>
    axiosClient.put(`/event/${eventId}`, body),
};
