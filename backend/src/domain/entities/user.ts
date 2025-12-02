export interface User {
  id: string;
  email: string;
  username: string;
  password_hash: string;
  fullname: string;
  bio?: string | null;
  profile_picture?: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface UserCreate {
  email: string;
  username: string;
  password_hash: string;
  fullname: string;
  bio?: string | null;
  profile_picture?: string | null;
}

export interface UserUpdate extends Partial<UserCreate> {}


