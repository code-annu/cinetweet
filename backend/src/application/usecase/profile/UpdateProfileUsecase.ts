import { inject, injectable } from "inversify";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { UpdateProfileInputDTO, ProfileOutputDTO } from "../../dto/profile-dto";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { TYPES } from "../../../di/types";
import { UserUpdate } from "../../../domain/entities/user";

@injectable()
export class UpdateProfileUsecase {
  constructor(
    @inject(TYPES.IUserRepository)
    private userRepository: IUserRepository
  ) {}

  async execute(
    userId: string,
    input: UpdateProfileInputDTO
  ): Promise<ProfileOutputDTO> {
    // Get existing user
    const existingUser = await this.userRepository.getUserById(userId);
    if (!existingUser) {
      throw new NotFoundError("Profile not found");
    }

    // Build update object with only defined properties
    const updateData: UserUpdate = {};
    
    if (input.fullname !== undefined) {
      updateData.fullname = input.fullname;
    }
    if (input.bio !== undefined) {
      updateData.bio = input.bio ?? null;
    }
    if (input.profile_picture !== undefined) {
      updateData.profile_picture = input.profile_picture ?? null;
    }

    // Update user profile
    const user = await this.userRepository.updateUser(userId, updateData);

    if (!user) {
      throw new NotFoundError("Profile not found");
    }

    return {
      user,
    };
  }
}

