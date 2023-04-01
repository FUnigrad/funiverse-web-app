import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { userApis } from 'apis';
import { QueryKeys } from 'queries';

export function useUserMeQuery({ enabled = true }: { enabled?: boolean } = {}) {
  return useQuery({
    queryKey: [QueryKeys.Users, 'me'],
    queryFn: userApis.getMe,
    cacheTime: 300000,
    enabled,
  });
}

export function useUsersQuery() {
  return useQuery({
    queryKey: [QueryKeys.Users, QueryKeys.Posts],
    queryFn: userApis.getUsers,
  });
}
