import { prisma } from "../config/db";
import { injectable } from "inversify";
import { ITweetCommentRepository } from "../../domain/repository/ITweetCommentRepository";
import {
  TweetComment,
  TweetCommentCreate,
  TweetCommentUpdate,
} from "../../domain/entities/tweet_comment";
import { mapPrismaTweetCommentToDomain } from "../mapper/tweet-comment-mapper";

@injectable()
export class TweetCommentRepository implements ITweetCommentRepository {
  async createTweetComment(data: TweetCommentCreate): Promise<TweetComment> {
    const comment = await prisma.tweetComment.create({
      data: {
        user_id: data.user_id,
        tweet_id: data.tweet_id,
        content: data.content,
      },
    });
    return mapPrismaTweetCommentToDomain(comment);
  }

  async getTweetComment(id: string): Promise<TweetComment | null> {
    const comment = await prisma.tweetComment.findUnique({
      where: { id },
    });
    return comment ? mapPrismaTweetCommentToDomain(comment) : null;
  }

  async updateTweetComment(
    id: string,
    data: TweetCommentUpdate
  ): Promise<TweetComment | null> {
    const updateData: any = {};
    if (data.content !== undefined) updateData.content = data.content;

    const comment = await prisma.tweetComment.update({
      where: { id },
      data: updateData,
    });
    return mapPrismaTweetCommentToDomain(comment);
  }

  async deleteTweetComment(id: string): Promise<void> {
    await prisma.tweetComment.delete({
      where: { id },
    });
  }

  async getCommentsOfTweet(tweetId: string): Promise<TweetComment[]> {
    const comments = await prisma.tweetComment.findMany({
      where: { tweet_id: tweetId },
      orderBy: {
        created_at: "desc",
      },
    });
    return comments.map(mapPrismaTweetCommentToDomain);
  }
}

