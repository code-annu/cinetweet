import { Request, Response, NextFunction } from "express";
import { TYPES } from "../../di/types";
import { CreateTweetUsecase } from "../../application/usecase/tweet/CreateTweetUsecase";
import { GetTweetUsecase } from "../../application/usecase/tweet/GetTweetUsecase";
import { UpdateTweetUsecase } from "../../application/usecase/tweet/UpdateTweetUsecase";
import { DeleteTweetUsecase } from "../../application/usecase/tweet/DeleteTweetUsecase";
import {
  CreateTweetInputDTO,
  UpdateTweetInputDTO,
} from "../../application/dto/tweet-dto";
import { mapToTweetResponse } from "../response/tweet-response";
import { container } from "../../di/container";
import { AuthRequest } from "../middleware/validate-authorization";
import { BadRequestError } from "../../domain/error/BadRequestError";

export class TweetController {
  async createTweet(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const createTweetUsecase = container.get<CreateTweetUsecase>(
        TYPES.CreateTweetUsecase
      );
      const userId = req.auth!.userId;
      const input: CreateTweetInputDTO = req.body;

      const result = await createTweetUsecase.execute(userId, input);
      const response = mapToTweetResponse(result);

      res.status(201).json({
        message: "Tweet created successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async getTweet(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const getTweetUsecase = container.get<GetTweetUsecase>(
        TYPES.GetTweetUsecase
      );
      const tweetId = req.params.id;

      if (!tweetId) {
        throw new BadRequestError("Tweet ID is required");
      }

      const result = await getTweetUsecase.execute(tweetId);
      const response = mapToTweetResponse(result);

      res.status(200).json({
        message: "Tweet retrieved successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async patchUpdateTweet(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const updateTweetUsecase = container.get<UpdateTweetUsecase>(
        TYPES.UpdateTweetUsecase
      );
      const tweetId = req.params.id;
      const userId = req.auth!.userId;
      const input: UpdateTweetInputDTO = req.body;

      if (!tweetId) throw new BadRequestError("Tweet ID is required");

      const result = await updateTweetUsecase.execute(tweetId, userId, input);
      const response = mapToTweetResponse(result);

      res.status(200).json({
        message: "Tweet updated successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteTweet(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const deleteTweetUsecase = container.get<DeleteTweetUsecase>(
        TYPES.DeleteTweetUsecase
      );
      const tweetId = req.params.id;
      const userId = req.auth!.userId;

      if (!tweetId) throw new BadRequestError("Tweet ID is required");

      await deleteTweetUsecase.execute(tweetId, userId);

      res.status(200).json({
        message: "Tweet deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
