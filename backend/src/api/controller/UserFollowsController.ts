import { Request, Response, NextFunction } from "express";
import { TYPES } from "../../di/types";
import { ToggleUserFollowUsecase } from "../../application/usecase/user_follows/ToggleUserFollowUsecase";
import { GetUserFollowersUsecase } from "../../application/usecase/user_follows/GetUserFollowersUsecase";
import { GetUserFollowingUsecase } from "../../application/usecase/user_follows/GetUserFollowingUsecase";
import { container } from "../../di/container";
import { AuthRequest } from "../middleware/validate-authorization";
import { BadRequestError } from "../../domain/error/BadRequestError";
import { mapToUserFollowsResponse } from "../response/user-follows-response";

export class UserFollowsController {
  async postFollow(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const toggleUserFollowUsecase = container.get<ToggleUserFollowUsecase>(
        TYPES.ToggleUserFollowUsecase
      );
      const followingId = req.params.userId;
      const followerId = req.auth!.userId;

      if (!followingId) {
        throw new BadRequestError("User ID is required");
      }

      const result = await toggleUserFollowUsecase.execute({
        followerId,
        followingId,
      });

      res.status(200).json({
        message: result.following
          ? "User followed successfully"
          : "User unfollowed successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserFollowers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const getUserFollowersUsecase = container.get<GetUserFollowersUsecase>(
        TYPES.GetUserFollowersUsecase
      );
      const userId = req.params.userId;

      if (!userId) {
        throw new BadRequestError("User ID is required");
      }

      const result = await getUserFollowersUsecase.execute({ userId });
      const response = mapToUserFollowsResponse(result);

      res.status(200).json({
        message: "User followers retrieved successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserFollowing(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const getUserFollowingUsecase = container.get<GetUserFollowingUsecase>(
        TYPES.GetUserFollowingUsecase
      );
      const userId = req.params.userId;

      if (!userId) {
        throw new BadRequestError("User ID is required");
      }

      const result = await getUserFollowingUsecase.execute({ userId });
      const response = mapToUserFollowsResponse(result);

      res.status(200).json({
        message: "User following retrieved successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
