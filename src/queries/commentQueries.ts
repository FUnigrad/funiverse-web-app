import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateCommentPayload } from '@types';
import { commentApis } from 'apis';
import { useModalContext } from 'contexts';
import { QueryKeys } from 'queries';

export function useCreateCommentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateCommentPayload) => commentApis.createComment(body),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: [QueryKeys.Comments] });
    },
  });
}
