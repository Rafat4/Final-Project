export class Post {
  title: string;
  content: string;
  user: any;
  _id: string;
  likes: PostLike[];
  comments: PostComment[];
}

export class PostLike {
  user: string;
  post: string
};

export class PostComment {
  user: string;
  comment: string;
  post: string;
};
