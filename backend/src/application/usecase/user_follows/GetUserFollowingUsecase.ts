import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types";
import { IUserFollowsRepository } from "../../../domain/repository/IUserFollowsRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import {
  GetUserFollowingInput,
  UserFollowDto,
} from "../../dto/user_follows_dto";

@injectable()
export class GetUserFollowingUsecase {
  constructor(
    @inject(TYPES.IUserFollowsRepository)
    private userFollowsRepository: IUserFollowsRepository,
    @inject(TYPES.IUserRepository)
    private userRepository: IUserRepository
  ) {}

  async execute(input: GetUserFollowingInput): Promise<UserFollowDto[]> {
    // Validate that the user exists
    const user = await this.userRepository.getUserById(input.userId);
    if (!user) throw new NotFoundError("User not found");

    // Get all users being followed
    const following = await this.userFollowsRepository.getFollowing(
      input.userId
    );

    return following;
  }
}
