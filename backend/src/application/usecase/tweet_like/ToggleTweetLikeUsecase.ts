import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types";
import { ITweetLikeRepository } from "../../../domain/repository/ITweetLikeRepository";
import { ITweetRepository } from "../../../domain/repository/ITweetRepository";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import {
  ToggleTweetLikeInput,
  ToggleTweetLikeOutput,
} from "../../dto/tweet_like_dto";

@injectable()
export class ToggleTweetLikeUsecase {
  constructor(
    @inject(TYPES.ITweetLikeRepository)
    private tweetLikeRepository: ITweetLikeRepository,
    @inject(TYPES.ITweetRepository)
    private tweetRepository: ITweetRepository
  ) {}

  async execute(input: ToggleTweetLikeInput): Promise<ToggleTweetLikeOutput> {
    const tweet = await this.tweetRepository.getTweet(input.tweetId);
    if (!tweet || tweet.is_deleted) {
      throw new NotFoundError("Tweet not found may be deleted");
    }

    const hasLiked = await this.tweetLikeRepository.hasUserLikedTweet(
      input.userId,
      input.tweetId
    );

    if (hasLiked) {
      await this.tweetLikeRepository.deleteLike(input.userId, input.tweetId);
      return { liked: false };
    } else {
      await this.tweetLikeRepository.createLike({
        user_id: input.userId,
        tweet_id: input.tweetId,
      });
      return { liked: true };
    }
  }
}
