import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types";
import { ITweetLikeRepository } from "../../../domain/repository/ITweetLikeRepository";
import { ITweetRepository } from "../../../domain/repository/ITweetRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { TweetLike } from "../../../domain/entities/tweet_like";

@injectable()
export class GetTweetLikesUsecase {
  constructor(
    @inject(TYPES.ITweetLikeRepository)
    private tweetLikeRepository: ITweetLikeRepository,
    @inject(TYPES.ITweetRepository)
    private tweetRepository: ITweetRepository,
    @inject(TYPES.IUserRepository)
    private userRepository: IUserRepository
  ) {}

  async execute(tweetId: string): Promise<TweetLike[]> {
    const tweet = await this.tweetRepository.getTweet(tweetId);
    if (!tweet || tweet.is_deleted) {
      throw new NotFoundError("Tweet not found may be deleted");
    }

    const likes = await this.tweetLikeRepository.getLikes(tweetId);

    return likes;
  }
}
