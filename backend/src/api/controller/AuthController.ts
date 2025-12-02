import { Request, Response, NextFunction } from "express";
import { TYPES } from "../../di/types";
import { SignupUsecase } from "../../application/usecase/auth/SignupUsecase";
import { LoginUsecase } from "../../application/usecase/auth/LoginUsecase";
import { RefreshTokenUsecase } from "../../application/usecase/auth/RefreshTokenUsecase";
import { SignupInputDTO, LoginInputDTO } from "../../application/dto/auth-dto";
import { mapToAuthResponse } from "../response/auth-response";
import { container } from "../../di/container";

export class AuthController {
  async postSignup(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const signupUsecase = container.get<SignupUsecase>(TYPES.SignupUsecase);
      const input: SignupInputDTO = req.body;

      const result = await signupUsecase.execute(input);
      const response = mapToAuthResponse(result);

      res.status(201).json({
        message: "User created successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async postLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const loginUsecase = container.get<LoginUsecase>(TYPES.LoginUsecase);
      const input: LoginInputDTO = req.body;

      const result = await loginUsecase.execute(input);
      const response = mapToAuthResponse(result);

      res.status(200).json({
        message: "Login successful",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async postRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const refreshTokenUsecase = container.get<RefreshTokenUsecase>(
        TYPES.RefreshTokenUsecase
      );
      const { refresh_token } = req.body;

      const result = await refreshTokenUsecase.execute(refresh_token);
      const response = mapToAuthResponse(result);

      res.status(200).json({
        message: "Token refreshed successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
