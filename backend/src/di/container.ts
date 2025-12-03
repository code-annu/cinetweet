import { Container } from "inversify";
import { TYPES } from "./types";

// Repositories
import { IUserRepository } from "../domain/repository/IUserRepository";
import { ISessionRepository } from "../domain/repository/ISessionRepository";
import { IProfileRepository } from "../domain/repository/IProfileRepository";
import { UserRepository } from "../infrastructure/repository/UserRepository";
import { SessionRepository } from "../infrastructure/repository/SessionRepository";
import { ProfileRepository } from "../infrastructure/repository/ProfileRepository";

// Use Cases
import { SignupUsecase } from "../application/usecase/auth/SignupUsecase";
import { LoginUsecase } from "../application/usecase/auth/LoginUsecase";
import { RefreshTokenUsecase } from "../application/usecase/auth/RefreshTokenUsecase";
import { GetMyProfileUsecase } from "../application/usecase/profile/GetMyProfileUsecase";
import { UpdateProfileUsecase } from "../application/usecase/profile/UpdateProfileUsecase";
import { DeleteProfileUsecase } from "../application/usecase/profile/DeleteProfileUsecase";
import { GetUserProfileUsecase } from "../application/usecase/user/GetUserProfileUsecase";

const container = new Container();

// Bind Repositories
container
  .bind<IUserRepository>(TYPES.IUserRepository)
  .to(UserRepository)
  .inSingletonScope();

container
  .bind<ISessionRepository>(TYPES.ISessionRepository)
  .to(SessionRepository)
  .inSingletonScope();

container
  .bind<IProfileRepository>(TYPES.IProfileRepository)
  .to(ProfileRepository)
  .inSingletonScope();

// Bind Use Cases
container
  .bind<SignupUsecase>(TYPES.SignupUsecase)
  .to(SignupUsecase)
  .inTransientScope();

container
  .bind<LoginUsecase>(TYPES.LoginUsecase)
  .to(LoginUsecase)
  .inTransientScope();

container
  .bind<RefreshTokenUsecase>(TYPES.RefreshTokenUsecase)
  .to(RefreshTokenUsecase)
  .inTransientScope();

container
  .bind<GetMyProfileUsecase>(TYPES.GetMyProfileUsecase)
  .to(GetMyProfileUsecase)
  .inTransientScope();

container
  .bind<UpdateProfileUsecase>(TYPES.UpdateProfileUsecase)
  .to(UpdateProfileUsecase)
  .inTransientScope();

container
  .bind<DeleteProfileUsecase>(TYPES.DeleteProfileUsecase)
  .to(DeleteProfileUsecase)
  .inTransientScope();

container
  .bind<GetUserProfileUsecase>(TYPES.GetUserProfileUsecase)
  .to(GetUserProfileUsecase)
  .inTransientScope();

export { container };
