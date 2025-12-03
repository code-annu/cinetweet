import { prisma } from "../config/db";
import { injectable } from "inversify";
import { ITweetLikeRepository } from "../../domain/repository/ITweetLikeRepository";
import { TweetLike, TweetLikeCreate } from "../../domain/entities/tweet_like";
import { mapPrismaTweetLikeToDomain } from "../mapper/tweet-like-mapper";

@injectable()
export class TweetLikeRepository implements ITweetLikeRepository {
  async createLike(data: TweetLikeCreate): Promise<TweetLike> {
    const like = await prisma.tweetLike.create({
      data: {
        user_id: data.user_id,
        tweet_id: data.tweet_id,
      },
    });
    return mapPrismaTweetLikeToDomain(like);
  }

  async deleteLike(userId: string, tweetId: string): Promise<void> {
    await prisma.tweetLike.deleteMany({
      where: {
        user_id: userId,
        tweet_id: tweetId,
      },
    });
  }

  async hasUserLikedTweet(userId: string, tweetId: string): Promise<boolean> {
    const count = await prisma.tweetLike.count({
      where: {
        user_id: userId,
        tweet_id: tweetId,
      },
    });
    return count > 0;
  }

  async getLikes(tweetId: string): Promise<TweetLike[]> {
    const likes = await prisma.tweetLike.findMany({
      where: {
        tweet_id: tweetId,
      },
    });
    return likes.map(mapPrismaTweetLikeToDomain);
  }
}
