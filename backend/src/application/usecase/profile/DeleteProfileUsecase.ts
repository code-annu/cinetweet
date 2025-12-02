import { inject, injectable } from "inversify";
import { IProfileRepository } from "../../../domain/repository/IProfileRepository";
import { DeleteProfileInputDTO } from "../../dto/profile-dto";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { TYPES } from "../../../di/types";

@injectable()
export class DeleteProfileUsecase {
  constructor(
    @inject(TYPES.IProfileRepository)
    private profileRepository: IProfileRepository
  ) {}

  async execute(input: DeleteProfileInputDTO): Promise<void> {
    // Get existing profile
    const existingProfile = await this.profileRepository.getProfileByUserId(
      input.user_id
    );
    if (!existingProfile) {
      throw new NotFoundError("Profile not found");
    }

    // Delete profile
    await this.profileRepository.deleteProfile(existingProfile.id);
  }
}

