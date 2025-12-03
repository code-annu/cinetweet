import { SearchUsersOutputDTO } from "../../application/dto/user-dto";

export interface UserSummaryResponse {
  id: string;
  username: string;
  fullname: string;
  bio?: string | null;
  profile_picture?: string | null;
  created_at: Date;
  updated_at: Date;
}

export function mapToUserSearchResponse(
  dto: SearchUsersOutputDTO
): UserSummaryResponse[] {
  return dto.users.map((user) => ({
    id: user.id,
    username: user.username,
    fullname: user.fullname,
    bio: user.bio ?? null,
    profile_picture: user.profile_picture ?? null,
    created_at: user.created_at,
    updated_at: user.updated_at,
  }));
}


