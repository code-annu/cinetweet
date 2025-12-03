import { Response, NextFunction } from "express";
import { TYPES } from "../../di/types";
import { UpdateProfileUsecase } from "../../application/usecase/profile/UpdateProfileUsecase";
import { DeleteProfileUsecase } from "../../application/usecase/profile/DeleteProfileUsecase";
import { UpdateProfileInputDTO } from "../../application/dto/profile-dto";
import { mapToProfileResponse } from "../response/profile-response";
import { container } from "../../di/container";
import { AuthRequest } from "../middleware/validate-authorization";
import { GetMyProfileUsecase } from "../../application/usecase/profile/GetMyProfileUsecase";

export class ProfileController {
  async getMyProfile(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const getProfileUsecase = container.get<GetMyProfileUsecase>(
        TYPES.GetMyProfileUsecase
      );
      const userId = req.auth!.userId;

      const result = await getProfileUsecase.execute(userId);
      const response = mapToProfileResponse(result);

      res.status(200).json({
        message: "Profile retrieved successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async putUpdateProfile(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const updateProfileUsecase = container.get<UpdateProfileUsecase>(
        TYPES.UpdateProfileUsecase
      );
      const userId = req.auth!.userId;
      const input: UpdateProfileInputDTO = req.body;

      const result = await updateProfileUsecase.execute(userId, input);
      const response = mapToProfileResponse(result);

      res.status(200).json({
        message: "Profile updated successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteProfile(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const deleteProfileUsecase = container.get<DeleteProfileUsecase>(
        TYPES.DeleteProfileUsecase
      );
      const userId = req.auth!.userId;

      await deleteProfileUsecase.execute({ user_id: userId });

      res.status(200).json({
        message: "Profile deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
