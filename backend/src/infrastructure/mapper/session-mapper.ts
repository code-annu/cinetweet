import { Session } from "../../domain/entities/session.";

export function mapPrismaSessionToDomain(prismaSession: {
  id: string;
  user_id: string;
  refresh_token: string;
  expires_at: Date;
  created_at: Date;
  updated_at: Date;
}): Session {
  return {
    id: prismaSession.id,
    user_id: prismaSession.user_id,
    refresh_token: prismaSession.refresh_token,
    expires_at: prismaSession.expires_at,
    created_at: prismaSession.created_at,
    updated_at: prismaSession.updated_at,
  };
}
