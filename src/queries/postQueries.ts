import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreatePostPayload } from '@types';
import { postApis } from 'apis';
import { useModalContext } from 'contexts';
import { QueryKeys } from 'queries';

export function useCreatePostMutation() {
  const { dispatch } = useModalContext();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreatePostPayload) => postApis.createPost(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Groups] });
      dispatch({ type: 'close' });
    },
  });
}
