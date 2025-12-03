import { prisma } from "../config/db";
import { injectable } from "inversify";
import { ITweetRepository } from "../../domain/repository/ITweetRepository";
import { Tweet, TweetCreate, TweetUpdate } from "../../domain/entities/tweet";
import { mapPrismaTweetToDomain } from "../mapper/tweet-mapper";

@injectable()
export class TweetRepository implements ITweetRepository {
  async createTweet(data: TweetCreate): Promise<Tweet> {
    const tweet = await prisma.tweet.create({
      data: {
        user_id: data.user_id,
        content: data.content,
        ...(data.media_url !== undefined && { media_url: data.media_url }),
      },
    });
    return mapPrismaTweetToDomain(tweet);
  }

  async getTweet(id: string): Promise<Tweet | null> {
    const tweet = await prisma.tweet.findUnique({
      where: { id },
    });
    return tweet ? mapPrismaTweetToDomain(tweet) : null;
  }

  async updateTweet(id: string, data: TweetUpdate): Promise<Tweet | null> {
    const updateData: any = {};
    if (data.content !== undefined) updateData.content = data.content;
    if (data.media_url !== undefined) updateData.media_url = data.media_url;

    const tweet = await prisma.tweet.update({
      where: { id },
      data: updateData,
    });
    return mapPrismaTweetToDomain(tweet);
  }

  async deleteTweet(id: string): Promise<void> {
    await prisma.tweet.update({
      where: { id },
      data: {
        is_deleted: true,
        deleted_at: new Date(),
      },
    });
  }

  async getTweetsByUserId(userId: string): Promise<Tweet[]> {
    const tweets = await prisma.tweet.findMany({
      where: {
        user_id: userId,
        is_deleted: false,
      },
      orderBy: {
        created_at: "desc",
      },
    });
    return tweets.map(mapPrismaTweetToDomain);
  }
}

