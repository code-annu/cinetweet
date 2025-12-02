import { inject, injectable } from "inversify";
import { IProfileRepository } from "../../../domain/repository/IProfileRepository";
import { CreateProfileInputDTO, ProfileOutputDTO } from "../../dto/profile-dto";
import { ConflictError } from "../../../domain/error/ConflictError";
import { TYPES } from "../../../di/types";

@injectable()
export class CreateProfileUsecase {
  constructor(
    @inject(TYPES.IProfileRepository)
    private profileRepository: IProfileRepository
  ) {}

  async execute(input: CreateProfileInputDTO): Promise<ProfileOutputDTO> {
    // Check if profile already exists for this user (check if bio or profile_picture is already set)
    const existingProfile = await this.profileRepository.getProfileByUserId(
      input.user_id
    );
    if (existingProfile && (existingProfile.bio || existingProfile.profile_picture)) {
      throw new ConflictError("Profile already exists for this user");
    }

    // Create/Initialize profile
    const profile = await this.profileRepository.createProfile({
      user_id: input.user_id,
      fullname: input.fullname,
      bio: input.bio ?? null,
      profile_picture: input.profile_picture ?? null,
    });

    return {
      profile,
    };
  }
}

