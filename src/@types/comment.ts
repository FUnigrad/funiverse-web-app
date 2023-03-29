export interface CreateCommentPayload {
  content: string;
  ownerId: string | number;
  postId: string | number;
}
export interface Comment {
  content: string;
  ownerId: number;
  postId: number;
}
