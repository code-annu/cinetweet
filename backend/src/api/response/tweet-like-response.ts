import { TweetLike } from "../../domain/entities/tweet_like";

export interface TweetLikesResponse {
  count: number;
  likes: TweetLike[];
}

export const mapToTweetLikesResponse = (
  tweetLikes: TweetLike[]
): TweetLikesResponse => {
  return {
    count: tweetLikes.length,
    likes: tweetLikes,
  };
};
