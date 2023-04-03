import { UseQueryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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

//Events
export function useUserEventsQuery({
  enabled = true,
  params = { unread: false },
}: {
  enabled?: boolean;
  params?: { unread: boolean };
} = {}) {
  return useQuery({
    queryKey: [QueryKeys.Users, QueryKeys.Events, params],
    queryFn: () => userApis.getUserEvents(params),
    enabled,
  });
}

export function useUpdateEventMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, body }: { eventId: string | number; body: { read: boolean } }) =>
      userApis.updateEvent(eventId, body),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Users, QueryKeys.Events] });
    },
  });
}
