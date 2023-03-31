export interface CreatePostPayload {
  content: string;
  ownerId: number;
  groupId: number;
}

export interface Post {
  content: string;
  ownerId: number;
  groupId: number;
}
