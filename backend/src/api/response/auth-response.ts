import { AuthOutputDTO } from "../../application/dto/auth-dto";

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    username: string;
    fullname: string;
    bio: string | null;
    profile_picture: string | null;
    created_at: Date;
    updated_at: Date;
  };
  access_token: string;
  session: {
    id: string;
    user_id: string;
    refresh_token: string;
    expires_at: Date;
  };
}

export function mapToAuthResponse(authDTO: AuthOutputDTO): AuthResponse {
  return {
    user: {
      id: authDTO.user.id,
      email: authDTO.user.email,
      username: authDTO.user.username,
      fullname: authDTO.user.fullname,
      bio: authDTO.user.bio ?? null,
      profile_picture: authDTO.user.profile_picture ?? null,
      created_at: authDTO.user.created_at,
      updated_at: authDTO.user.updated_at,
    },
    access_token: authDTO.accessToken,
    session: {
      id: authDTO.session.id,
      user_id: authDTO.session.user_id,
      refresh_token: authDTO.session.refresh_token,
      expires_at: authDTO.session.expires_at,
    },
  };
}
