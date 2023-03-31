import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Comment, CreatePostCommentPayload } from '@types';
// import { CreatePostPayload } from '@types';
import { postApis } from 'apis';
import { useModalContext } from 'contexts';
import { useLazyQuery } from 'hooks';
import { QueryKeys } from 'queries';

export function useCreatePostCommentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreatePostCommentPayload) => postApis.createPostComment(body),
    onSuccess: (response) => {
      // queryClient.invalidateQueries({ queryKey: [QueryKeys.Comments] });
    },
  });
}

export function usePostCommentsQuery({
  postId,
  initialData,
}: {
  postId: string;
  initialData: Comment[];
}) {
  // return useQuery({
  //   queryKey: [QueryKeys.Posts, postId, QueryKeys.Comments],
  //   queryFn: () => postApis.getPostComments(postId),
  //   initialData,
  // });
  return useLazyQuery({
    queryKey: [QueryKeys.Posts, postId, QueryKeys.Comments],
    queryFn: () => postApis.getPostComments(postId),
    initialData,
  });
}
