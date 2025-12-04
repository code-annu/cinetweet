import { UserFollows } from "../../domain/entities/user_follows";

export interface UserFollowsResponse {
  count: number;
  follows: UserFollows[];
}

export const mapToUserFollowsResponse = (
  userFollows: UserFollows[]
): UserFollowsResponse => {
  return {
    count: userFollows.length,
    follows: userFollows,
  };
};
