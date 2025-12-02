export const TYPES = {
  // Repositories
  IUserRepository: Symbol.for("IUserRepository"),
  ISessionRepository: Symbol.for("ISessionRepository"),

  // Use Cases
  SignupUsecase: Symbol.for("SignupUsecase"),
  LoginUsecase: Symbol.for("LoginUsecase"),
  RefreshTokenUsecase: Symbol.for("RefreshTokenUsecase"),
  GetProfileUsecase: Symbol.for("GetProfileUsecase"),
  UpdateProfileUsecase: Symbol.for("UpdateProfileUsecase"),
  DeleteProfileUsecase: Symbol.for("DeleteProfileUsecase"),
};

