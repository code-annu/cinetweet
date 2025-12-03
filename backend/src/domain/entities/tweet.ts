export interface Tweet {
  id: string;
  user_id: string;
  content: string;
  media_url?: string | null;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
}

export interface TweetCreate {
  user_id: string;
  content: string;
  media_url?: string | null;
}

export interface TweetUpdate {
  content?: string;
  media_url?: string | null;
}

