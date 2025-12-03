export interface ToggleTweetLikeOutput {
  liked: boolean;
}

export interface ToggleTweetLikeInput {
  userId: string;
  tweetId: string;
}
