import { Response, NextFunction } from "express";
import { TYPES } from "../../di/types";
import { CreateProfileUsecase } from "../../application/usecase/profile/CreateProfileUsecase";
import { GetProfileUsecase } from "../../application/usecase/profile/GetProfileUsecase";
import { UpdateProfileUsecase } from "../../application/usecase/profile/UpdateProfileUsecase";
import { DeleteProfileUsecase } from "../../application/usecase/profile/DeleteProfileUsecase";
import {
  CreateProfileInputDTO,
  UpdateProfileInputDTO,
} from "../../application/dto/profile-dto";
import { mapToProfileResponse } from "../response/profile-response";
import { container } from "../../di/container";
import { AuthRequest } from "../middleware/validate-authorization";

export class ProfileController {
  async postCreateProfile(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const createProfileUsecase = container.get<CreateProfileUsecase>(
        TYPES.CreateProfileUsecase
      );
      const input: CreateProfileInputDTO = {
        user_id: req.auth!.userId,
        ...req.body,
      };

      const result = await createProfileUsecase.execute(input);
      const response = mapToProfileResponse(result);

      res.status(201).json({
        message: "Profile created successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async getProfile(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const getProfileUsecase = container.get<GetProfileUsecase>(
        TYPES.GetProfileUsecase
      );
      const userId = req.auth!.userId;

      const result = await getProfileUsecase.execute({ user_id: userId });
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

