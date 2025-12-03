export interface TweetComment {
  id: string;
  user_id: string;
  tweet_id: string;
  content: string;
  created_at: Date;
  updated_at: Date;
}

export interface TweetCommentCreate {
  user_id: string;
  tweet_id: string;
  content: string;
}

export interface TweetCommentUpdate {
  content?: string;
}

