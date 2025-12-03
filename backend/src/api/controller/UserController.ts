import { Request, Response, NextFunction } from "express";
import { TYPES } from "../../di/types";
import { GetUserProfileUsecase } from "../../application/usecase/user/GetUserProfileUsecase";
import { SearchUsersByUsernameUsecase } from "../../application/usecase/user/SearchUsersByUsernameUsecase";
import { mapToProfileResponse } from "../response/profile-response";
import { container } from "../../di/container";
import { BadRequestError } from "../../domain/error/BadRequestError";
import { GetUserTweetsUsecase } from "../../application/usecase/tweet/GetUserTweetsUsecase";
import { mapToTweetsResponse } from "../response/tweet-response";
import { mapToUserSearchResponse } from "../response/user-response";

export class UserController {
  async searchUsersByUsername(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const searchUsersUsecase = container.get<SearchUsersByUsernameUsecase>(
        TYPES.SearchUsersByUsernameUsecase
      );
      const username = req.query.username;

      if (!username || typeof username !== "string" || !username.trim()) {
        throw new BadRequestError("username query param is required");
      }

      const result = await searchUsersUsecase.execute({
        username: username.trim(),
      });
      const response = mapToUserSearchResponse(result);

      res.status(200).json({
        message: "Users retrieved successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const getUserProfileUsecase = container.get<GetUserProfileUsecase>(
        TYPES.GetUserProfileUsecase
      );
      const userId = req.params.userId;

      if (!userId) {
        throw new BadRequestError("User ID is required");
      }

      const result = await getUserProfileUsecase.execute({ userId });
      const response = mapToProfileResponse({
        profile: result.profile,
      });

      res.status(200).json({
        message: "User profile retrieved successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserTweets(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const getUserTweetsUsecase = container.get<GetUserTweetsUsecase>(
        TYPES.GetUserTweetsUsecase
      );
      const userId = req.params.userId;

      if (!userId) {
        throw new BadRequestError("User ID is required");
      }

      const result = await getUserTweetsUsecase.execute(userId);
      const response = mapToTweetsResponse(result);

      res.status(200).json({
        message: "User tweets retrieved successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
