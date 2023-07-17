import { Post, Subthreadit, User, Comment, Vote } from "@prisma/client";

export type ExtendedPost = Post & {
  subthreadit: Subthreadit;
  votes: Vote[];
  author: User;
  comments: Comment[];
};
