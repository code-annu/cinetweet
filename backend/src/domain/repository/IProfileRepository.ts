import { Profile, ProfileCreate, ProfileUpdate } from "../entities/profile";

export interface IProfileRepository {
  createProfile(data: ProfileCreate): Promise<Profile>;
  getProfileById(id: string): Promise<Profile | null>;
  getProfileByUserId(userId: string): Promise<Profile | null>;
  updateProfile(id: string, data: ProfileUpdate): Promise<Profile | null>;
  deleteProfile(id: string): Promise<void>;
}

