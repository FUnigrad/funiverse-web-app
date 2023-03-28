import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CreateGroupPayload } from '@types';
import { groupApis } from 'apis';
import { QueryKeys } from 'queries';

export function useGroupQuery() {
  return useQuery({ queryKey: [QueryKeys.Groups], queryFn: groupApis.getUserGroups });
}

export function useCreateGroupMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateGroupPayload) => groupApis.createUserGroup(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Groups] });
    },
  });
}

export function useUsersNotInGroupQuery(groupId: string) {
  return useQuery({
    queryKey: [QueryKeys.Groups, QueryKeys.Slug, QueryKeys.UsersNotIn],
    queryFn: () => groupApis.getUsersNotInGroup(groupId),
  });
}
