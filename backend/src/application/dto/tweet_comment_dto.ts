import { TweetComment } from "../../domain/entities/tweet_comment";

export interface CreateTweetCommentInput {
  tweetId: string;
  content: string;
}

export interface CreateTweetCommentOutput {
  comment: TweetComment;
}

export interface GetTweetCommentOutput {
  comment: TweetComment;
}

export interface UpdateTweetCommentInput {
  commentId: string;
  content: string;
}

export interface UpdateTweetCommentOutput {
  comment: TweetComment;
}

export interface GetCommentsOfTweetOutput {
  comments: TweetComment[];
}

