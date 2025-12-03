import { Profile } from "../../domain/entities/profile";

export interface GetUserProfileInputDTO {
  username: string;
}

export interface UserProfileOutputDTO {
  profile: Profile;
}

