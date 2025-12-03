import { Container } from "inversify";
import { TYPES } from "./types";

// Repositories
import { IUserRepository } from "../domain/repository/IUserRepository";
import { ISessionRepository } from "../domain/repository/ISessionRepository";
import { IProfileRepository } from "../domain/repository/IProfileRepository";
import { ITweetRepository } from "../domain/repository/ITweetRepository";
import { UserRepository } from "../infrastructure/repository/UserRepository";
import { SessionRepository } from "../infrastructure/repository/SessionRepository";
import { ProfileRepository } from "../infrastructure/repository/ProfileRepository";
import { TweetRepository } from "../infrastructure/repository/TweetRepository";

// Use Cases
import { SignupUsecase } from "../application/usecase/auth/SignupUsecase";
import { LoginUsecase } from "../application/usecase/auth/LoginUsecase";
import { RefreshTokenUsecase } from "../application/usecase/auth/RefreshTokenUsecase";
import { GetMyProfileUsecase } from "../application/usecase/profile/GetMyProfileUsecase";
import { UpdateProfileUsecase } from "../application/usecase/profile/UpdateProfileUsecase";
import { DeleteProfileUsecase } from "../application/usecase/profile/DeleteProfileUsecase";
import { GetUserProfileUsecase } from "../application/usecase/user/GetUserProfileUsecase";
import { SearchUsersByUsernameUsecase } from "../application/usecase/user/SearchUsersByUsernameUsecase";
import { CreateTweetUsecase } from "../application/usecase/tweet/CreateTweetUsecase";
import { GetTweetUsecase } from "../application/usecase/tweet/GetTweetUsecase";
import { UpdateTweetUsecase } from "../application/usecase/tweet/UpdateTweetUsecase";
import { DeleteTweetUsecase } from "../application/usecase/tweet/DeleteTweetUsecase";
import { GetUserTweetsUsecase } from "../application/usecase/tweet/GetUserTweetsUsecase";

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

container
  .bind<ITweetRepository>(TYPES.ITweetRepository)
  .to(TweetRepository)
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

container
  .bind<SearchUsersByUsernameUsecase>(TYPES.SearchUsersByUsernameUsecase)
  .to(SearchUsersByUsernameUsecase)
  .inTransientScope();

container
  .bind<CreateTweetUsecase>(TYPES.CreateTweetUsecase)
  .to(CreateTweetUsecase)
  .inTransientScope();

container
  .bind<GetTweetUsecase>(TYPES.GetTweetUsecase)
  .to(GetTweetUsecase)
  .inTransientScope();

container
  .bind<GetUserTweetsUsecase>(TYPES.GetUserTweetsUsecase)
  .to(GetUserTweetsUsecase)
  .inTransientScope();

container
  .bind<UpdateTweetUsecase>(TYPES.UpdateTweetUsecase)
  .to(UpdateTweetUsecase)
  .inTransientScope();

container
  .bind<DeleteTweetUsecase>(TYPES.DeleteTweetUsecase)
  .to(DeleteTweetUsecase)
  .inTransientScope();

export { container };
