import { prisma } from "../config/db";
import { injectable } from "inversify";
import { IUserFollowsRepository } from "../../domain/repository/IUserFollowsRepository";
import {
  UserFollows,
  UserFollowsCreate,
} from "../../domain/entities/user_follows";
import { mapPrismaUserFollowsToDomain } from "../mapper/user-follows-mapper";

@injectable()
export class UserFollowsRepository implements IUserFollowsRepository {
  async createUserFollows(data: UserFollowsCreate): Promise<UserFollows> {
    const userFollow = await prisma.userFollows.create({
      data: {
        follower_id: data.follower_id,
        following_id: data.following_id,
      },
    });

    return mapPrismaUserFollowsToDomain(userFollow);
  }

  async deleteUserFollows(
    followerId: string,
    followingId: string
  ): Promise<void> {
    await prisma.userFollows.delete({
      where: {
        follower_id_following_id: {
          follower_id: followerId,
          following_id: followingId,
        },
      },
    });
  }

  async isFollowing(followerId: string, followingId: string): Promise<boolean> {
    const count = await prisma.userFollows.count({
      where: {
        follower_id: followerId,
        following_id: followingId,
      },
    });
    return count > 0;
  }

  async getFollowers(userId: string): Promise<UserFollows[]> {
    const followers = await prisma.userFollows.findMany({
      where: {
        following_id: userId,
      },
    });
    return followers.map(mapPrismaUserFollowsToDomain);
  }

  async getFollowing(userId: string): Promise<UserFollows[]> {
    const following = await prisma.userFollows.findMany({
      where: {
        follower_id: userId,
      },
    });
    return following.map(mapPrismaUserFollowsToDomain);
  }
}
