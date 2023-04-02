import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CreateGroupPayload, CreateGroupPostPayload } from '@types';
import { groupApis } from 'apis';
import { useModalContext } from 'contexts';
import { useRouter } from 'next/router';
import { QueryKeys } from 'queries';

export function useGroupsQuery() {
  return useQuery({ queryKey: [QueryKeys.Groups], queryFn: groupApis.getUserGroups });
}

export function useCreateGroupMutation() {
  const queryClient = useQueryClient();
  const { dispatch } = useModalContext();
  const router = useRouter();
  return useMutation<number, unknown, CreateGroupPayload, unknown>({
    mutationFn: (body) => groupApis.createUserGroup(body),
    onSuccess: (groupId) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Groups] });
      dispatch({ type: 'close' });
      router.push(`groups/${groupId}`);
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

export function useGroupDetailQuery(groupId: string, { enabled }: { enabled?: boolean } = {}) {
  return useQuery({
    queryKey: [QueryKeys.Groups, groupId],
    queryFn: () => groupApis.getGroupDetail(groupId),
    enabled: enabled ?? Boolean(groupId),
  });
}

// Post

export function useGroupPostsQuery(groupId: string) {
  return useQuery({
    queryKey: [QueryKeys.Groups, groupId, QueryKeys.Posts],
    queryFn: () => groupApis.getGroupPosts(groupId),
    enabled: Boolean(groupId),
  });
}

export function useCreateGroupPostMutation(groupId: string) {
  const { dispatch } = useModalContext();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateGroupPostPayload) => groupApis.createGroupPost(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Groups, groupId, QueryKeys.Posts] });
      dispatch({ type: 'close' });
    },
  });
}

// User

export function useGroupUsersQuery(groupId: string) {
  return useQuery({
    queryKey: [QueryKeys.Groups, groupId, QueryKeys.Users],
    queryFn: () => groupApis.getGroupUsers(groupId),
    enabled: Boolean(groupId),
  });
}

export function useAddGroupUsersMutation(groupId: string) {
  const { dispatch } = useModalContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ groupId, userIds }: { groupId: string; userIds: number[] }) =>
      groupApis.addGroupUsers(groupId, userIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Groups, groupId, QueryKeys.Users] });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Groups, groupId, QueryKeys.UsersNotIn],
      });
      dispatch({ type: 'close' });
    },
  });
}

//Academic
export function useGroupAcademicQuery(groupId: string) {
  return useQuery({
    queryKey: [QueryKeys.Groups, groupId, QueryKeys.Academic],
    queryFn: () => groupApis.getGroupAcademic(groupId),
    enabled: Boolean(groupId),
  });
}
export function useGroupAcademicSyllabusQuery(curriculumId: string) {
  return useQuery({
    queryKey: [QueryKeys.Groups, curriculumId, QueryKeys.Academic, QueryKeys.Syllabus],
    queryFn: () => groupApis.getGroupAcademicSyllabus(curriculumId),
    enabled: Boolean(curriculumId),
  });
}
