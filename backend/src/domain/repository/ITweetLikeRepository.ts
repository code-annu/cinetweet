import { TweetLike, TweetLikeCreate } from "../entities/tweet_like";

export interface ITweetLikeRepository {
  createLike(data: TweetLikeCreate): Promise<TweetLike>;
  deleteLike(userId: string, tweetId: string): Promise<void>;
  hasUserLikedTweet(userId: string, tweetId: string): Promise<boolean>;
  getLikes(tweetId: string): Promise<TweetLike[]>;
}
