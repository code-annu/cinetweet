import { prisma } from "../config/db";
import { injectable } from "inversify";
import { IProfileRepository } from "../../domain/repository/IProfileRepository";
import {
  Profile,
  ProfileCreate,
  ProfileUpdate,
} from "../../domain/entities/profile";
import { mapPrismaUserToProfile } from "../mapper/profile-mapper";
import { NotFoundError } from "../../domain/error/NotFoundError";

@injectable()
export class ProfileRepository implements IProfileRepository {
  async createProfile(data: ProfileCreate): Promise<Profile> {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: data.user_id },
    });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    // Update user with profile data (profile fields are part of User model)
    const updatedUser = await prisma.user.update({
      where: { id: data.user_id },
      data: {
        fullname: data.fullname,
        ...(data.bio !== undefined && { bio: data.bio }),
        ...(data.profile_picture !== undefined && {
          profile_picture: data.profile_picture,
        }),
      },
    });

    return mapPrismaUserToProfile(updatedUser);
  }

  async getProfileById(id: string): Promise<Profile | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return user ? mapPrismaUserToProfile(user) : null;
  }

  async getProfileByUserId(userId: string): Promise<Profile | null> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    return user ? mapPrismaUserToProfile(user) : null;
  }

  async updateProfile(id: string, data: ProfileUpdate): Promise<Profile | null> {
    const updateData: any = {};
    if (data.fullname !== undefined) updateData.fullname = data.fullname;
    if (data.bio !== undefined) updateData.bio = data.bio;
    if (data.profile_picture !== undefined)
      updateData.profile_picture = data.profile_picture;

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
    });

    return mapPrismaUserToProfile(user);
  }

  async deleteProfile(id: string): Promise<void> {
    // Clear profile fields (set to null/default)
    await prisma.user.update({
      where: { id },
      data: {
        bio: null,
        profile_picture: null,
      },
    });
  }
}

