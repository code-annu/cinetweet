import { Profile } from "../../domain/entities/profile";
import { User } from "../../domain/entities/user";

export interface GetUserProfileInputDTO {
  userId: string;
}

export interface UserProfileOutputDTO {
  profile: Profile;
}

export interface SearchUsersInputDTO {
  username: string;
}

export interface SearchUsersOutputDTO {
  users: User[];
}

