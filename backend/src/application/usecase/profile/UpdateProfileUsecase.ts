import { inject, injectable } from "inversify";
import { IProfileRepository } from "../../../domain/repository/IProfileRepository";
import { UpdateProfileInputDTO, ProfileOutputDTO } from "../../dto/profile-dto";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { TYPES } from "../../../di/types";

@injectable()
export class UpdateProfileUsecase {
  constructor(
    @inject(TYPES.IProfileRepository)
    private profileRepository: IProfileRepository
  ) {}

  async execute(
    userId: string,
    input: UpdateProfileInputDTO
  ): Promise<ProfileOutputDTO> {
    // Get existing profile
    const existingProfile = await this.profileRepository.getProfileByUserId(
      userId
    );
    if (!existingProfile) {
      throw new NotFoundError("Profile not found");
    }

    // Build update object with only defined properties
    const updateData: {
      fullname?: string;
      bio?: string | null;
      profile_picture?: string | null;
    } = {};
    
    if (input.fullname !== undefined) {
      updateData.fullname = input.fullname;
    }
    if (input.bio !== undefined) {
      updateData.bio = input.bio;
    }
    if (input.profile_picture !== undefined) {
      updateData.profile_picture = input.profile_picture;
    }

    // Update profile
    const profile = await this.profileRepository.updateProfile(
      existingProfile.id,
      updateData
    );

    if (!profile) {
      throw new NotFoundError("Profile not found");
    }

    return {
      profile,
    };
  }
}

