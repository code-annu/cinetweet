import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types";
import { ITweetCommentRepository } from "../../../domain/repository/ITweetCommentRepository";
import { ITweetRepository } from "../../../domain/repository/ITweetRepository";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import {
  CreateTweetCommentInput,
  CreateTweetCommentOutput,
} from "../../dto/tweet_comment_dto";
import { Types } from "@prisma/client/runtime/client";
import { IUserRepository } from "../../../domain/repository/IUserRepository";

@injectable()
export class CreateTweetCommentUsecase {
  constructor(
    @inject(TYPES.ITweetCommentRepository)
    private tweetCommentRepository: ITweetCommentRepository,
    @inject(TYPES.ITweetRepository)
    private tweetRepository: ITweetRepository,
    @inject(TYPES.IUserRepository)
    private readonly userRepo: IUserRepository
  ) {}

  async execute(
    userId: string,
    input: CreateTweetCommentInput
  ): Promise<CreateTweetCommentOutput> {
    const tweet = await this.tweetRepository.getTweet(input.tweetId);
    if (!tweet || tweet.is_deleted) {
      throw new NotFoundError("Tweet not found or deleted");
    }

    const user = await this.userRepo.getUserById(userId);
    if (!user) throw new NotFoundError("User not found");

    const comment = await this.tweetCommentRepository.createTweetComment({
      user_id: userId,
      tweet_id: input.tweetId,
      content: input.content,
    });

    return { comment };
  }
}
