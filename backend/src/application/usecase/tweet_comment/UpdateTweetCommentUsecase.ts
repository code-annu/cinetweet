import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types";
import { ITweetCommentRepository } from "../../../domain/repository/ITweetCommentRepository";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { ForbiddenError } from "../../../domain/error/ForbiddenError";
import {
  UpdateTweetCommentInput,
  UpdateTweetCommentOutput,
} from "../../dto/tweet_comment_dto";

@injectable()
export class UpdateTweetCommentUsecase {
  constructor(
    @inject(TYPES.ITweetCommentRepository)
    private tweetCommentRepository: ITweetCommentRepository
  ) {}

  async execute(
    userId: string,
    input: UpdateTweetCommentInput
  ): Promise<UpdateTweetCommentOutput> {
    const existingComment =
      await this.tweetCommentRepository.getTweetComment(input.commentId);
    if (!existingComment) {
      throw new NotFoundError("Comment not found");
    }

    if (existingComment.user_id !== userId) {
      throw new ForbiddenError(
        "You are not authorized to update this comment"
      );
    }

    const comment = await this.tweetCommentRepository.updateTweetComment(
      input.commentId,
      { content: input.content }
    );

    if (!comment) {
      throw new NotFoundError("Comment not found");
    }

    return { comment };
  }
}

