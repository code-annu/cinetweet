import { Profile } from "../../domain/entities/profile";

export interface CreateProfileInputDTO {
  user_id: string;
  fullname: string;
  bio?: string;
  profile_picture?: string;
}

export interface UpdateProfileInputDTO {
  fullname?: string;
  bio?: string;
  profile_picture?: string;
}

export interface GetProfileInputDTO {
  user_id: string;
}

export interface DeleteProfileInputDTO {
  user_id: string;
}

export interface ProfileOutputDTO {
  profile: Profile;
}

