import { inject, injectable } from "inversify";
import { IProfileRepository } from "../../../domain/repository/IProfileRepository";
import { GetProfileInputDTO, ProfileOutputDTO } from "../../dto/profile-dto";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { TYPES } from "../../../di/types";

@injectable()
export class GetProfileUsecase {
  constructor(
    @inject(TYPES.IProfileRepository)
    private profileRepository: IProfileRepository
  ) {}

  async execute(input: GetProfileInputDTO): Promise<ProfileOutputDTO> {
    const profile = await this.profileRepository.getProfileByUserId(
      input.user_id
    );
    if (!profile) {
      throw new NotFoundError("Profile not found");
    }

    return {
      profile,
    };
  }
}

