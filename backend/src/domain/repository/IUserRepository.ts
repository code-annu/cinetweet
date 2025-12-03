import { User, UserCreate, UserUpdate } from "../entities/user";

export interface IUserRepository {
  createUser(data: UserCreate): Promise<User>;
  getUserById(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserByUsername(username: string): Promise<User | null>;
  searchUsersByUsername(username: string): Promise<User[]>;
  updateUser(id: string, data: UserUpdate): Promise<User | null>;
  deleteUser(id: string): Promise<void>;
}
