import {
  TweetComment,
  TweetCommentCreate,
  TweetCommentUpdate,
} from "../entities/tweet_comment";

export interface ITweetCommentRepository {
  createTweetComment(data: TweetCommentCreate): Promise<TweetComment>;
  getTweetComment(id: string): Promise<TweetComment | null>;
  updateTweetComment(
    id: string,
    data: TweetCommentUpdate
  ): Promise<TweetComment | null>;
  deleteTweetComment(id: string): Promise<void>;
  getCommentsOfTweet(tweetId: string): Promise<TweetComment[]>;
}

