import {
  TweetOutputDTO,
  TweetsOutputDTO,
} from "../../application/dto/tweet-dto";

export interface TweetResponse {
  id: string;
  user_id: string;
  content: string;
  media_url?: string | null;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
}

export function mapToTweetResponse(tweetDTO: TweetOutputDTO): TweetResponse {
  return {
    id: tweetDTO.tweet.id,
    user_id: tweetDTO.tweet.user_id,
    content: tweetDTO.tweet.content,
    media_url: tweetDTO.tweet.media_url ?? null,
    is_deleted: tweetDTO.tweet.is_deleted,
    created_at: tweetDTO.tweet.created_at,
    updated_at: tweetDTO.tweet.updated_at,
    deleted_at: tweetDTO.tweet.deleted_at ?? null,
  };
}

export type TweetsResponse = TweetResponse[];

export function mapToTweetsResponse(
  tweetsDTO: TweetsOutputDTO
): TweetsResponse {
  return tweetsDTO.tweets.map((tweet) => ({
    id: tweet.id,
    user_id: tweet.user_id,
    content: tweet.content,
    media_url: tweet.media_url ?? null,
    is_deleted: tweet.is_deleted,
    created_at: tweet.created_at,
    updated_at: tweet.updated_at,
    deleted_at: tweet.deleted_at ?? null,
  }));
}

