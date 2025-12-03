import { inject, injectable } from "inversify";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import {
  SearchUsersInputDTO,
  SearchUsersOutputDTO,
} from "../../dto/user-dto";
import { TYPES } from "../../../di/types";

@injectable()
export class SearchUsersByUsernameUsecase {
  constructor(
    @inject(TYPES.IUserRepository)
    private userRepository: IUserRepository
  ) {}

  async execute(input: SearchUsersInputDTO): Promise<SearchUsersOutputDTO> {
    const query = input.username.trim();
    const users = await this.userRepository.searchUsersByUsername(query);
    return { users };
  }
}


