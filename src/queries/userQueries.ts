import { useQuery } from '@tanstack/react-query';
import { userApis } from 'apis';
import { QueryKeys } from 'queries';

export function useUserMeQuery() {
  return useQuery({ queryKey: [QueryKeys.Users, 'me'], queryFn: userApis.getMe });
}
