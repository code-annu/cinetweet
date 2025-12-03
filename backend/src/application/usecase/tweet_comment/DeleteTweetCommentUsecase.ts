import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types";
import { ITweetCommentRepository } from "../../../domain/repository/ITweetCommentRepository";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { ForbiddenError } from "../../../domain/error/ForbiddenError";

@injectable()
export class DeleteTweetCommentUsecase {
  constructor(
    @inject(TYPES.ITweetCommentRepository)
    private tweetCommentRepository: ITweetCommentRepository
  ) {}

  async execute(userId: string, commentId: string): Promise<void> {
    const existingComment =
      await this.tweetCommentRepository.getTweetComment(commentId);
    if (!existingComment) {
      throw new NotFoundError("Comment not found");
    }

    if (existingComment.user_id !== userId) {
      throw new ForbiddenError(
        "You are not authorized to delete this comment"
      );
    }

    await this.tweetCommentRepository.deleteTweetComment(commentId);
  }
}

