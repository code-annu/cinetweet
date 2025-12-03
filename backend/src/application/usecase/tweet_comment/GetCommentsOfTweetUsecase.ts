import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types";
import { ITweetCommentRepository } from "../../../domain/repository/ITweetCommentRepository";
import { ITweetRepository } from "../../../domain/repository/ITweetRepository";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { GetCommentsOfTweetOutput } from "../../dto/tweet_comment_dto";

@injectable()
export class GetCommentsOfTweetUsecase {
  constructor(
    @inject(TYPES.ITweetCommentRepository)
    private tweetCommentRepository: ITweetCommentRepository,
    @inject(TYPES.ITweetRepository)
    private tweetRepository: ITweetRepository
  ) {}

  async execute(tweetId: string): Promise<GetCommentsOfTweetOutput> {
    const tweet = await this.tweetRepository.getTweet(tweetId);
    if (!tweet || tweet.is_deleted) {
      throw new NotFoundError("Tweet not found or deleted");
    }

    const comments = await this.tweetCommentRepository.getCommentsOfTweet(
      tweetId
    );

    return { comments };
  }
}

