import { inject, injectable } from "inversify";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { GetProfileInputDTO, ProfileOutputDTO } from "../../dto/profile-dto";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { TYPES } from "../../../di/types";

@injectable()
export class GetProfileUsecase {
  constructor(
    @inject(TYPES.IUserRepository)
    private userRepository: IUserRepository
  ) {}

  async execute(input: GetProfileInputDTO): Promise<ProfileOutputDTO> {
    const user = await this.userRepository.getUserById(input.user_id);
    if (!user) {
      throw new NotFoundError("Profile not found");
    }

    return {
      user,
    };
  }
}

