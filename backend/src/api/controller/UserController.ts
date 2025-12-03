import { Request, Response, NextFunction } from "express";
import { TYPES } from "../../di/types";
import { GetUserProfileUsecase } from "../../application/usecase/user/GetUserProfileUsecase";
import { mapToProfileResponse } from "../response/profile-response";
import { container } from "../../di/container";
import { BadRequestError } from "../../domain/error/BadRequestError";

export class UserController {
  async getUserProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const getUserProfileUsecase = container.get<GetUserProfileUsecase>(
        TYPES.GetUserProfileUsecase
      );
      const username = req.params.username;

      if (!username) {
        throw new BadRequestError("Username is required");
      }

      const result = await getUserProfileUsecase.execute({ username });
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
}
