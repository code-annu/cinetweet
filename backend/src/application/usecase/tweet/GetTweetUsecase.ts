import { inject, injectable } from "inversify";
import { ITweetRepository } from "../../../domain/repository/ITweetRepository";
import { TweetOutputDTO } from "../../dto/tweet-dto";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { TYPES } from "../../../di/types";

@injectable()
export class GetTweetUsecase {
  constructor(
    @inject(TYPES.ITweetRepository)
    private tweetRepository: ITweetRepository
  ) {}

  async execute(tweetId: string): Promise<TweetOutputDTO> {
    const tweet = await this.tweetRepository.getTweet(tweetId);
    if (!tweet || tweet.is_deleted) {
      throw new NotFoundError("Tweet not found");
    }

    return {
      tweet,
    };
  }
}

