import { User } from "../../domain/entities/user";

export function mapPrismaUserToDomain(prismaUser: {
  id: string;
  email: string;
  username: string;
  password_hash: string;
  fullname: string;
  bio: string | null;
  profile_picture: string | null;
  created_at: Date;
  updated_at: Date;
}): User {
  return {
    id: prismaUser.id,
    email: prismaUser.email,
    username: prismaUser.username,
    password_hash: prismaUser.password_hash,
    fullname: prismaUser.fullname,
    bio: prismaUser.bio,
    profile_picture: prismaUser.profile_picture,
    created_at: prismaUser.created_at,
    updated_at: prismaUser.updated_at,
  };
}
