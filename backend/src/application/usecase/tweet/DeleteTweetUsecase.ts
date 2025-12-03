import { inject, injectable } from "inversify";
import { ITweetRepository } from "../../../domain/repository/ITweetRepository";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { ForbiddenError } from "../../../domain/error/ForbiddenError";
import { TYPES } from "../../../di/types";

@injectable()
export class DeleteTweetUsecase {
  constructor(
    @inject(TYPES.ITweetRepository)
    private tweetRepository: ITweetRepository
  ) {}

  async execute(tweetId: string, userId: string): Promise<void> {
    const existingTweet = await this.tweetRepository.getTweet(tweetId);
    if (!existingTweet || existingTweet.is_deleted) {
      throw new NotFoundError("Tweet not found");
    }

    if (existingTweet.user_id !== userId) {
      throw new ForbiddenError("You are not authorized to delete this tweet");
    }

    await this.tweetRepository.deleteTweet(tweetId);
  }
}

