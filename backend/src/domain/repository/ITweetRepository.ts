import { Tweet, TweetCreate, TweetUpdate } from "../entities/tweet";

export interface ITweetRepository {
  createTweet(data: TweetCreate): Promise<Tweet>;
  getTweet(id: string): Promise<Tweet | null>;
  updateTweet(id: string, data: TweetUpdate): Promise<Tweet | null>;
  deleteTweet(id: string): Promise<void>;
  getTweetsByUserId(userId: string): Promise<Tweet[]>;
}

