import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types";
import { IUserFollowsRepository } from "../../../domain/repository/IUserFollowsRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import {
  ToggleUserFollowInput,
  ToggleUserFollowOutput,
} from "../../dto/user_follows_dto";
import { ConflictError } from "../../../domain/error/ConflictError";

@injectable()
export class ToggleUserFollowUsecase {
  constructor(
    @inject(TYPES.IUserFollowsRepository)
    private userFollowsRepository: IUserFollowsRepository,
    @inject(TYPES.IUserRepository)
    private userRepository: IUserRepository
  ) {}

  async execute(input: ToggleUserFollowInput): Promise<ToggleUserFollowOutput> {
    const user = await this.userRepository.getUserById(input.followerId);
    if (!user) throw new NotFoundError("User not found");

    // Validate that the user to follow exists
    const userToFollow = await this.userRepository.getUserById(
      input.followingId
    );
    if (!userToFollow) throw new NotFoundError("User to follow not found");

    if (input.followerId == input.followingId) {
      throw new ConflictError("You cannot follow yourself");
    }
    // Check if already following
    const isFollowing = await this.userFollowsRepository.isFollowing(
      input.followerId,
      input.followingId
    );

    if (isFollowing) {
      // Unfollow
      await this.userFollowsRepository.deleteUserFollows(
        input.followerId,
        input.followingId
      );
      return { following: false };
    } else {
      // Follow
      await this.userFollowsRepository.createUserFollows({
        follower_id: input.followerId,
        following_id: input.followingId,
      });
      return { following: true };
    }
  }
}
