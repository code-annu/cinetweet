export interface Profile {
  id: string;
  user_id: string;
  fullname: string;
  bio?: string | null;
  profile_picture?: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface ProfileCreate {
  user_id: string;
  fullname: string;
  bio?: string | null;
  profile_picture?: string | null;
}

export interface ProfileUpdate extends Partial<Omit<ProfileCreate, "user_id">> {}

