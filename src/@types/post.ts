import { Comment } from './comment';
import { BaseInfo, Owner } from './common';

export interface Post {
  id: number;
  content: string;
  owner: Owner;
  createdDateTime: Date;
  group: GroupPostResponse;
  comments: Comment[];
}

interface GroupPostResponse extends BaseInfo {}
