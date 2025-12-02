import bcrypt from "bcrypt";
import ms, { StringValue } from "ms";
import { inject, injectable } from "inversify";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { ISessionRepository } from "../../../domain/repository/ISessionRepository";
import { SignupInputDTO, AuthOutputDTO } from "../../dto/auth-dto";
import { generateTokens } from "../../../util/jwt-util";
import { ConflictError } from "../../../domain/error/ConflictError";
import { TYPES } from "../../../di/types";

@injectable()
export class SignupUsecase {
  constructor(
    @inject(TYPES.IUserRepository)
    private userRepository: IUserRepository,
    @inject(TYPES.ISessionRepository)
    private sessionRepository: ISessionRepository
  ) {}

  async execute(input: SignupInputDTO): Promise<AuthOutputDTO> {
    // Check if user with email already exists
    const existingUserByEmail = await this.userRepository.getUserByEmail(
      input.email
    );
    if (existingUserByEmail) {
      throw new ConflictError("User with this email already exists");
    }

    // Check if user with username already exists
    const existingUserByUsername = await this.userRepository.getUserByUsername(
      input.username
    );
    if (existingUserByUsername) {
      throw new ConflictError("User with this username already exists");
    }

    // Hash the password
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(input.password, saltRounds);

    // Create user
    const user = await this.userRepository.createUser({
      email: input.email,
      username: input.username,
      password_hash,
      fullname: input.fullname,
      bio: input.bio ?? null,
      profile_picture: input.profile_picture ?? null,
    });

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens({
      userId: user.id,
      username: user.username,
    });

    // Calculate refresh token expiry date
    const refreshTokenExpiryString = (process.env.JWT_REFRESH_EXPIRES_IN ||
      "30d") as StringValue;
    const refreshTokenExpiry = ms(refreshTokenExpiryString);
    const expires_at = new Date(Date.now() + refreshTokenExpiry);

    // Create session
    const session = await this.sessionRepository.createSession({
      user_id: user.id,
      refresh_token: refreshToken,
      expires_at,
    });

    return {
      user,
      accessToken,
      session,
    };
  }
}
