export interface UserFollows {
  follower_id: string;
  following_id: string;
  created_at: Date;
}

export interface UserFollowsCreate {
  follower_id: string;
  following_id: string;
}
