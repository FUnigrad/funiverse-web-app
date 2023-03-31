import { QueryClient } from '@tanstack/react-query';

export const QueryKeys = {
  Groups: 'groups',
  Users: 'users',
  UsersNotIn: 'users-not-in',
  Slug: 'slug',
  Posts: 'posts',
  Comments: 'comments',
};
export * from './groupQueries';
export * from './postQueries';
export * from './userQueries';
export * from './commentQueries';
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});
