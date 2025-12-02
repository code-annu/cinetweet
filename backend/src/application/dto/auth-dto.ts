import { Session } from "../../domain/entities/session.";
import { User } from "../../domain/entities/user";

export interface SignupInputDTO {
  email: string;
  username: string;
  password: string;
  fullname: string;
  bio?: string;
  profile_picture?: string;
}

export interface LoginInputDTO {
  email: string;
  password: string;
}

export interface AuthOutputDTO {
  user: User;
  accessToken: string;
  session: Session;
}
