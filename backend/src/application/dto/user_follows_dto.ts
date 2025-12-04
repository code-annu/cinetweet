export interface ToggleUserFollowInput {
  followerId: string;
  followingId: string;
}

export interface ToggleUserFollowOutput {
  following: boolean;
}

export interface GetUserFollowersInput {
  userId: string;
}

export interface GetUserFollowingInput {
  userId: string;
}

export interface UserFollowDto {
  follower_id: string;
  following_id: string;
  created_at: Date;
}
