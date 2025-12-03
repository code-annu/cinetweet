export const TYPES = {
  // Repositories
  IUserRepository: Symbol.for("IUserRepository"),
  ISessionRepository: Symbol.for("ISessionRepository"),
  IProfileRepository: Symbol.for("IProfileRepository"),
  ITweetRepository: Symbol.for("ITweetRepository"),

  // Use Cases
  SignupUsecase: Symbol.for("SignupUsecase"),
  LoginUsecase: Symbol.for("LoginUsecase"),
  RefreshTokenUsecase: Symbol.for("RefreshTokenUsecase"),
  GetMyProfileUsecase: Symbol.for("GetMyProfileUsecase"),
  UpdateProfileUsecase: Symbol.for("UpdateProfileUsecase"),
  DeleteProfileUsecase: Symbol.for("DeleteProfileUsecase"),
  GetUserProfileUsecase: Symbol.for("GetUserProfileUsecase"),
  SearchUsersByUsernameUsecase: Symbol.for("SearchUsersByUsernameUsecase"),
  CreateTweetUsecase: Symbol.for("CreateTweetUsecase"),
  GetTweetUsecase: Symbol.for("GetTweetUsecase"),
  GetUserTweetsUsecase: Symbol.for("GetUserTweetsUsecase"),
  UpdateTweetUsecase: Symbol.for("UpdateTweetUsecase"),
  DeleteTweetUsecase: Symbol.for("DeleteTweetUsecase"),

  ITweetLikeRepository: Symbol.for("ITweetLikeRepository"),
  ToggleTweetLikeUsecase: Symbol.for("ToggleTweetLikeUsecase"),
  GetTweetLikesUsecase: Symbol.for("GetTweetLikesUsecase"),
  ITweetCommentRepository: Symbol.for("ITweetCommentRepository"),
  CreateTweetCommentUsecase: Symbol.for("CreateTweetCommentUsecase"),
  GetTweetCommentUsecase: Symbol.for("GetTweetCommentUsecase"),
  UpdateTweetCommentUsecase: Symbol.for("UpdateTweetCommentUsecase"),
  DeleteTweetCommentUsecase: Symbol.for("DeleteTweetCommentUsecase"),
  GetCommentsOfTweetUsecase: Symbol.for("GetCommentsOfTweetUsecase"),
};
