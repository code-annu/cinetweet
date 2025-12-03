import { inject, injectable } from "inversify";
import { IProfileRepository } from "../../../domain/repository/IProfileRepository";
import { ProfileOutputDTO } from "../../dto/profile-dto";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { TYPES } from "../../../di/types";

@injectable()
export class GetMyProfileUsecase {
  constructor(
    @inject(TYPES.IProfileRepository)
    private profileRepository: IProfileRepository
  ) {}

  async execute(userId: string): Promise<ProfileOutputDTO> {
    const profile = await this.profileRepository.getProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundError("Profile not found");
    }

    return {
      profile,
    };
  }
}

