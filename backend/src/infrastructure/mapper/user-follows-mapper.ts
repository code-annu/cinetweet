import { UserFollows } from "../../domain/entities/user_follows";

export function mapPrismaUserFollowsToDomain(prismaUserFollows: {
  follower_id: string;
  following_id: string;
  created_at: Date;
}): UserFollows {
  return {
    follower_id: prismaUserFollows.follower_id,
    following_id: prismaUserFollows.following_id,
    created_at: prismaUserFollows.created_at,
  };
}
