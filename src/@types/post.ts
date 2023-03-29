export interface CreatePostPayload {
  content: string;
  ownerId: string | number;
  groupId: string | number;
}

export interface Post {
  content: string;
  ownerId: number;
  groupId: number;
}
