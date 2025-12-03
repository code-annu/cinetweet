import { prisma } from "../config/db";
import { injectable } from "inversify";
import { IProfileRepository } from "../../domain/repository/IProfileRepository";
import { Profile } from "../../domain/entities/profile";
import { mapPrismaUserToProfile } from "../mapper/profile-mapper";

@injectable()
export class ProfileRepository implements IProfileRepository {
  async getProfileByUserId(userId: string): Promise<Profile | null> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    return user ? mapPrismaUserToProfile(user) : null;
  }

  async updateProfile(
    profileId: string,
    data: Partial<Profile>
  ): Promise<Profile | null> {
    const updateData: any = {};
    if (data.fullname !== undefined) updateData.fullname = data.fullname;
    if (data.bio !== undefined) updateData.bio = data.bio;
    if (data.profile_picture !== undefined)
      updateData.profile_picture = data.profile_picture;

    const user = await prisma.user.update({
      where: { id: profileId },
      data: updateData,
    });
    return mapPrismaUserToProfile(user);
  }
}
