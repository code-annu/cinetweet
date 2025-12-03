import { Profile } from "../../domain/entities/profile";

export function mapPrismaUserToProfile(prismaUser: {
  id: string;
  fullname: string;
  bio: string | null;
  profile_picture: string | null;
  created_at: Date;
  updated_at: Date;
}): Profile {
  return {
    id: prismaUser.id,
    user_id: prismaUser.id,
    fullname: prismaUser.fullname,
    bio: prismaUser.bio,
    profile_picture: prismaUser.profile_picture,
    created_at: prismaUser.created_at,
    updated_at: prismaUser.updated_at,
  };
}

