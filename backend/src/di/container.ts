import { Container } from "inversify";
import { TYPES } from "./types";

// Repositories
import { IUserRepository } from "../domain/repository/IUserRepository";
import { ISessionRepository } from "../domain/repository/ISessionRepository";
import { UserRepository } from "../infrastructure/repository/UserRepository";
import { SessionRepository } from "../infrastructure/repository/SessionRepository";

// Use Cases
import { SignupUsecase } from "../application/usecase/auth/SignupUsecase";
import { LoginUsecase } from "../application/usecase/auth/LoginUsecase";
import { RefreshTokenUsecase } from "../application/usecase/auth/RefreshTokenUsecase";

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

export { container };

