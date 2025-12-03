import { Request, Response, NextFunction } from "express";
import { TYPES } from "../../di/types";
import { ToggleTweetLikeUsecase } from "../../application/usecase/tweet_like/ToggleTweetLikeUsecase";
import { GetTweetLikesUsecase } from "../../application/usecase/tweet_like/GetTweetLikesUsecase";
import { container } from "../../di/container";
import { AuthRequest } from "../middleware/validate-authorization";
import { BadRequestError } from "../../domain/error/BadRequestError";
import { mapToTweetLikesResponse } from "../response/tweet-like-response";

export class TweetLikeController {
  async toggleLike(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const toggleTweetLikeUsecase = container.get<ToggleTweetLikeUsecase>(
        TYPES.ToggleTweetLikeUsecase
      );
      const tweetId = req.params.id;
      const userId = req.auth!.userId;

      if (!tweetId) {
        throw new BadRequestError("Tweet ID is required");
      }

      const result = await toggleTweetLikeUsecase.execute({ userId, tweetId });

      res.status(200).json({
        message: result.liked
          ? "Tweet liked successfully"
          : "Tweet unliked successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getLikes(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const getTweetLikesUsecase = container.get<GetTweetLikesUsecase>(
        TYPES.GetTweetLikesUsecase
      );
      const tweetId = req.params.id;

      if (!tweetId) {
        throw new BadRequestError("Tweet ID is required");
      }

      const result = await getTweetLikesUsecase.execute(tweetId);
      const response = mapToTweetLikesResponse(result);

      res.status(200).json({
        message: "Tweet likes retrieved successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
