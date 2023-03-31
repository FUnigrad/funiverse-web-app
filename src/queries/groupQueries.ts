import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CreateGroupPayload } from '@types';
import { groupApis } from 'apis';
import { useModalContext } from 'contexts';
import { QueryKeys } from 'queries';

export function useGroupsQuery() {
  return useQuery({ queryKey: [QueryKeys.Groups], queryFn: groupApis.getUserGroups });
}

export function useCreateGroupMutation() {
  const queryClient = useQueryClient();
  const { dispatch } = useModalContext();
  return useMutation({
    mutationFn: (body: CreateGroupPayload) => groupApis.createUserGroup(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Groups] });
      dispatch({ type: 'close' });
    },
  });
}

export function useUsersNotInGroupQuery(groupId: string) {
  return useQuery({
    queryKey: [QueryKeys.Groups, groupId, QueryKeys.UsersNotIn],
    queryFn: () => groupApis.getUsersNotInGroup(groupId),
    enabled: Boolean(groupId),
  });
}

export function useGroupDetailQuery(groupId: string) {
  return useQuery({
    queryKey: [QueryKeys.Groups, groupId],
    queryFn: () => groupApis.getGroupDetail(groupId),
    enabled: Boolean(groupId),
  });
}

export function useGroupPostsQuery(groupId: string) {
  return useQuery({
    queryKey: [QueryKeys.Groups, groupId, QueryKeys.Posts],
    queryFn: () => groupApis.getGroupPosts(groupId),
    enabled: Boolean(groupId),
  });
}
