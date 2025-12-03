export interface GetProfileInputDTO {
  user_id: string;
}

export interface UpdateProfileInputDTO {
  fullname?: string;
  bio?: string | null;
  profile_picture?: string | null;
}

export interface DeleteProfileInputDTO {
  user_id: string;
}

import { Profile } from "../../domain/entities/profile";

export interface ProfileOutputDTO {
  profile: Profile;
}

