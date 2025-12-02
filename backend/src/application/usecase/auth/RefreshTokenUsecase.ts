import ms, { StringValue } from "ms";
import { inject, injectable } from "inversify";
import { ISessionRepository } from "../../../domain/repository/ISessionRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { verifyRefreshToken, generateTokens } from "../../../util/jwt-util";
import { UnauthorizedError } from "../../../domain/error/UnauthorizedError";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { AuthOutputDTO } from "../../dto/auth-dto";
import { TYPES } from "../../../di/types";

@injectable()
export class RefreshTokenUsecase {
  constructor(
    @inject(TYPES.ISessionRepository)
    private sessionRepository: ISessionRepository,
    @inject(TYPES.IUserRepository)
    private userRepository: IUserRepository
  ) {}

  async execute(token: string): Promise<AuthOutputDTO> {
    // Find session by refresh token first
    let session = await this.sessionRepository.getSessionByToken(token);
    if (!session) {
      throw new NotFoundError("Session not found for this token");
    }

    // Check if session is expired
    if (session.expires_at < new Date()) {
      throw new UnauthorizedError("Session has expired");
    }

    // Verify refresh token
    let payload;
    try {
      payload = verifyRefreshToken(token);
    } catch (error) {
      throw new UnauthorizedError("Invalid or expired refresh token");
    }

    // Verify that the token payload matches the session user
    if (payload.userId !== session.user_id) {
      throw new UnauthorizedError("Token does not match session");
    }

    // Get user
    const user = await this.userRepository.getUserById(payload.userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    // Generate new tokens
    const { accessToken, refreshToken } = generateTokens({
      userId: user.id,
      username: user.username,
    });

    // Calculate refresh token expiry date
    const refreshTokenExpiryString = (process.env.JWT_REFRESH_EXPIRES_IN ||
      "30d") as StringValue;
    const refreshTokenExpiry = ms(refreshTokenExpiryString);
    const expires_at = new Date(Date.now() + refreshTokenExpiry);

    // Invalidate old session and create new one for security (token rotation)
    await this.sessionRepository.deleteSession(session.id);
    
    session = await this.sessionRepository.createSession({
      user_id: user.id,
      refresh_token: refreshToken,
      expires_at,
    });

    return { user, accessToken, session };
  }
}
