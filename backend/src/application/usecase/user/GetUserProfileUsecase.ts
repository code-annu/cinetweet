import { inject, injectable } from "inversify";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { GetUserProfileInputDTO, UserProfileOutputDTO } from "../../dto/user-dto";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { TYPES } from "../../../di/types";
import { mapPrismaUserToProfile } from "../../../infrastructure/mapper/profile-mapper";

@injectable()
export class GetUserProfileUsecase {
  constructor(
    @inject(TYPES.IUserRepository)
    private userRepository: IUserRepository
  ) {}

  async execute(input: GetUserProfileInputDTO): Promise<UserProfileOutputDTO> {
    const user = await this.userRepository.getUserById(input.userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    // Map User to Profile format
    const profile = mapPrismaUserToProfile({
      id: user.id,
      fullname: user.fullname,
      bio: user.bio ?? null,
      profile_picture: user.profile_picture ?? null,
      created_at: user.created_at,
      updated_at: user.updated_at,
    });

    return {
      profile,
    };
  }
}

