import { UserFollows, UserFollowsCreate } from "../entities/user_follows";

export interface IUserFollowsRepository {
  createUserFollows(data: UserFollowsCreate): Promise<UserFollows>;
  deleteUserFollows(followerId: string, followingId: string): Promise<void>;
  isFollowing(followerId: string, followingId: string): Promise<boolean>;
  getFollowers(userId: string): Promise<UserFollows[]>;
  getFollowing(userId: string): Promise<UserFollows[]>;
}
