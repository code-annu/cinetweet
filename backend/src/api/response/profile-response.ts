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
    id: profileDTO.user.id,
    user_id: profileDTO.user.id,
    fullname: profileDTO.user.fullname,
    bio: profileDTO.user.bio ?? null,
    profile_picture: profileDTO.user.profile_picture ?? null,
    created_at: profileDTO.user.created_at,
    updated_at: profileDTO.user.updated_at,
  };
}
