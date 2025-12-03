import { inject, injectable } from "inversify";
import { ITweetRepository } from "../../../domain/repository/ITweetRepository";
import { TweetsOutputDTO } from "../../dto/tweet-dto";
import { TYPES } from "../../../di/types";

@injectable()
export class GetUserTweetsUsecase {
  constructor(
    @inject(TYPES.ITweetRepository)
    private tweetRepository: ITweetRepository
  ) {}

  async execute(userId: string): Promise<TweetsOutputDTO> {
    const tweets = await this.tweetRepository.getTweetsByUserId(userId);
    return {
      tweets,
    };
  }
}


