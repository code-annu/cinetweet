import { inject, injectable } from "inversify";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { DeleteProfileInputDTO } from "../../dto/profile-dto";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { TYPES } from "../../../di/types";
import { UserUpdate } from "../../../domain/entities/user";

@injectable()
export class DeleteProfileUsecase {
  constructor(
    @inject(TYPES.IUserRepository)
    private userRepository: IUserRepository
  ) {}

  async execute(input: DeleteProfileInputDTO): Promise<void> {
    const existingUser = await this.userRepository.getUserById(input.user_id);
    if (!existingUser) {
      throw new NotFoundError("Profile not found");
    }

    await this.userRepository.deleteUser(input.user_id);
  }
}
