import { inject, injectable } from "inversify";
import { ITweetRepository } from "../../../domain/repository/ITweetRepository";
import { CreateTweetInputDTO, TweetOutputDTO } from "../../dto/tweet-dto";
import { TYPES } from "../../../di/types";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { NotFoundError } from "../../../domain/error/NotFoundError";

@injectable()
export class CreateTweetUsecase {
  constructor(
    @inject(TYPES.ITweetRepository)
    private tweetRepository: ITweetRepository,
    @inject(TYPES.IUserRepository)
    private userRepository: IUserRepository
  ) {}

  async execute(
    userId: string,
    input: CreateTweetInputDTO
  ): Promise<TweetOutputDTO> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) throw new NotFoundError("User not found");

    const tweet = await this.tweetRepository.createTweet({
      user_id: userId,
      content: input.content,
      media_url: input.media_url ?? null,
    });

    return {
      tweet,
    };
  }
}
