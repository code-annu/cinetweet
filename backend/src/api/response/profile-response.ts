import { ProfileOutputDTO } from "../../application/dto/profile-dto";

export interface ProfileResponse {
  id: string;
  user_id: string;
  fullname: string;
  bio?: string | null;
  profile_picture?: string | null;
  created_at: Date;
  updated_at: Date;
}

export function mapToProfileResponse(
  profileDTO: ProfileOutputDTO
): ProfileResponse {
  return {
    id: profileDTO.profile.id,
    user_id: profileDTO.profile.user_id,
    fullname: profileDTO.profile.fullname,
    bio: profileDTO.profile.bio ?? null,
    profile_picture: profileDTO.profile.profile_picture ?? null,
    created_at: profileDTO.profile.created_at,
    updated_at: profileDTO.profile.updated_at,
  };
}
