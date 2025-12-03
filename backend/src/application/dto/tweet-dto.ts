import { Tweet } from "../../domain/entities/tweet";

export interface CreateTweetInputDTO {
  content: string;
  media_url?: string | null;
}

export interface UpdateTweetInputDTO {
  content?: string;
  media_url?: string | null;
}

export interface TweetOutputDTO {
  tweet: Tweet;
}

export interface TweetsOutputDTO {
  tweets: Tweet[];
}

