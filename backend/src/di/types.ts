export const TYPES = {
  // Repositories
  IUserRepository: Symbol.for("IUserRepository"),
  ISessionRepository: Symbol.for("ISessionRepository"),
  IProfileRepository: Symbol.for("IProfileRepository"),

  // Use Cases
  SignupUsecase: Symbol.for("SignupUsecase"),
  LoginUsecase: Symbol.for("LoginUsecase"),
  RefreshTokenUsecase: Symbol.for("RefreshTokenUsecase"),
  GetMyProfileUsecase: Symbol.for("GetMyProfileUsecase"),
  UpdateProfileUsecase: Symbol.for("UpdateProfileUsecase"),
  DeleteProfileUsecase: Symbol.for("DeleteProfileUsecase"),
  GetUserProfileUsecase: Symbol.for("GetUserProfileUsecase"),
};

