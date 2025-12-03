import { inject, injectable } from "inversify";
import { ITweetRepository } from "../../../domain/repository/ITweetRepository";
import { UpdateTweetInputDTO, TweetOutputDTO } from "../../dto/tweet-dto";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { ForbiddenError } from "../../../domain/error/ForbiddenError";
import { TYPES } from "../../../di/types";

@injectable()
export class UpdateTweetUsecase {
  constructor(
    @inject(TYPES.ITweetRepository)
    private tweetRepository: ITweetRepository
  ) {}

  async execute(
    tweetId: string,
    userId: string,
    input: UpdateTweetInputDTO
  ): Promise<TweetOutputDTO> {
    const existingTweet = await this.tweetRepository.getTweet(tweetId);
    if (!existingTweet || existingTweet.is_deleted) {
      throw new NotFoundError("Tweet not found");
    }

    if (existingTweet.user_id !== userId) {
      throw new ForbiddenError("You are not authorized to update this tweet");
    }

    const tweet = await this.tweetRepository.updateTweet(tweetId, input);
    if (!tweet) {
      throw new NotFoundError("Tweet not found");
    }

    return {
      tweet,
    };
  }
}

