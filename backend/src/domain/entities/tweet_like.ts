export interface TweetLike {
  id: string;
  user_id: string;
  tweet_id: string;
  created_at: Date;
}

export interface TweetLikeCreate {
  user_id: string;
  tweet_id: string;
}
