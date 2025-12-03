import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types";
import { ITweetCommentRepository } from "../../../domain/repository/ITweetCommentRepository";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { GetTweetCommentOutput } from "../../dto/tweet_comment_dto";

@injectable()
export class GetTweetCommentUsecase {
  constructor(
    @inject(TYPES.ITweetCommentRepository)
    private tweetCommentRepository: ITweetCommentRepository
  ) {}

  async execute(commentId: string): Promise<GetTweetCommentOutput> {
    const comment = await this.tweetCommentRepository.getTweetComment(
      commentId
    );
    if (!comment) {
      throw new NotFoundError("Comment not found");
    }

    return { comment };
  }
}

