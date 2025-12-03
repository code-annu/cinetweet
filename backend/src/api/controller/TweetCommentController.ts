import { Request, Response, NextFunction } from "express";
import { TYPES } from "../../di/types";
import { CreateTweetCommentUsecase } from "../../application/usecase/tweet_comment/CreateTweetCommentUsecase";
import { GetTweetCommentUsecase } from "../../application/usecase/tweet_comment/GetTweetCommentUsecase";
import { UpdateTweetCommentUsecase } from "../../application/usecase/tweet_comment/UpdateTweetCommentUsecase";
import { DeleteTweetCommentUsecase } from "../../application/usecase/tweet_comment/DeleteTweetCommentUsecase";
import { GetCommentsOfTweetUsecase } from "../../application/usecase/tweet_comment/GetCommentsOfTweetUsecase";
import { container } from "../../di/container";
import { AuthRequest } from "../middleware/validate-authorization";
import { BadRequestError } from "../../domain/error/BadRequestError";
import {
  mapToTweetCommentResponse,
  mapToTweetCommentsResponse,
} from "../response/tweet-comment-response";

export class TweetCommentController {
  async postTweetComment(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const createTweetCommentUsecase =
        container.get<CreateTweetCommentUsecase>(
          TYPES.CreateTweetCommentUsecase
        );
      const tweetId = req.params.id;
      const userId = req.auth!.userId;
      const { content } = req.body;

      if (!tweetId) {
        throw new BadRequestError("Tweet ID is required");
      }

      const result = await createTweetCommentUsecase.execute(userId, {
        tweetId,
        content,
      });

      const response = mapToTweetCommentResponse(result);

      res.status(201).json({
        message: "Comment created successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async getTweetComment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const getTweetCommentUsecase = container.get<GetTweetCommentUsecase>(
        TYPES.GetTweetCommentUsecase
      );
      const commentId = req.params.commentId;

      if (!commentId) {
        throw new BadRequestError("Comment ID is required");
      }

      const result = await getTweetCommentUsecase.execute(commentId);
      const response = mapToTweetCommentResponse(result);

      res.status(200).json({
        message: "Comment retrieved successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async patchUpdateTweetComment(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const updateTweetCommentUsecase =
        container.get<UpdateTweetCommentUsecase>(
          TYPES.UpdateTweetCommentUsecase
        );
      const commentId = req.params.commentId;
      const userId = req.auth!.userId;
      const { content } = req.body;

      if (!commentId) {
        throw new BadRequestError("Comment ID is required");
      }

      const result = await updateTweetCommentUsecase.execute(userId, {
        commentId,
        content,
      });

      const response = mapToTweetCommentResponse(result);

      res.status(200).json({
        message: "Comment updated successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteTweetComment(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const deleteTweetCommentUsecase =
        container.get<DeleteTweetCommentUsecase>(
          TYPES.DeleteTweetCommentUsecase
        );
      const commentId = req.params.commentId;
      const userId = req.auth!.userId;

      if (!commentId) {
        throw new BadRequestError("Comment ID is required");
      }

      await deleteTweetCommentUsecase.execute(userId, commentId);

      res.status(200).json({
        message: "Comment deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async getCommentsForTweet(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const getCommentsOfTweetUsecase =
        container.get<GetCommentsOfTweetUsecase>(
          TYPES.GetCommentsOfTweetUsecase
        );
      const tweetId = req.params.id;

      if (!tweetId) {
        throw new BadRequestError("Tweet ID is required");
      }

      const result = await getCommentsOfTweetUsecase.execute(tweetId);
      const response = mapToTweetCommentsResponse(result);

      res.status(200).json({
        message: "Comments retrieved successfully",
        comments: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
