import { Profile } from "../entities/profile";

export interface IProfileRepository {
  getProfileByUserId(userId: string): Promise<Profile | null>;
  updateProfile(profileId: string, data: Partial<Profile>): Promise<Profile | null>;
}

