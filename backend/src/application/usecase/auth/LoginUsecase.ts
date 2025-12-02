import bcrypt from "bcrypt";
import ms, { StringValue } from "ms";
import { inject, injectable } from "inversify";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { ISessionRepository } from "../../../domain/repository/ISessionRepository";
import { LoginInputDTO, AuthOutputDTO } from "../../dto/auth-dto";
import { generateTokens } from "../../../util/jwt-util";
import { UnauthorizedError } from "../../../domain/error/UnauthorizedError";
import { TYPES } from "../../../di/types";

@injectable()
export class LoginUsecase {
  constructor(
    @inject(TYPES.IUserRepository)
    private userRepository: IUserRepository,
    @inject(TYPES.ISessionRepository)
    private sessionRepository: ISessionRepository
  ) {}

  async execute(input: LoginInputDTO): Promise<AuthOutputDTO> {
    // Find user by email
    const user = await this.userRepository.getUserByEmail(input.email);
    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(
      input.password,
      user.password_hash
    );
    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid email or password");
    }

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

    return { user, accessToken, session };
  }
}
