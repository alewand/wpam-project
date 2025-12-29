import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { UserService } from "src/user/services/user.service";
import { RegisterDto } from "../controllers/dto/register.dto";
import { AccessTokenService } from "src/tokens/services/accessToken.service";
import { UserWithTokens } from "src/user/types";
import { LoginDto } from "../controllers/dto/login.dto";
import { ErrorType } from "src/errors/types";
import { PasswordService } from "src/user/services/password.service";
import { DateTime } from "luxon";
import { RefreshTokenService } from "src/tokens/services/refreshToken.service";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private passwordService: PasswordService,
    private accessTokenService: AccessTokenService,
    private refreshTokenService: RefreshTokenService,
  ) {}

  async register(registerDto: RegisterDto): Promise<UserWithTokens> {
    const { name, email, password } = registerDto;

    const userExists = await this.userService.existsByEmail(email);

    if (userExists) throw new ConflictException(ErrorType.USER_ALREADY_EXISTS);

    const hashedPassword =
      await this.passwordService.getHashedPassword(password);

    const userWithTokens = await this.userService.create({
      name,
      email,
      password: hashedPassword,
    });

    return userWithTokens;
  }

  async login(loginDto: LoginDto): Promise<UserWithTokens> {
    const { email, password } = loginDto;
    const { user, userPassword } = await this.userService.findByEmail(email);

    if (!user || !userPassword)
      throw new UnauthorizedException(ErrorType.INVALID_CREDENTIALS);

    const isPasswordValid = await this.passwordService.comparePasswords(
      password,
      userPassword,
    );

    if (!isPasswordValid)
      throw new UnauthorizedException(ErrorType.INVALID_CREDENTIALS);

    const accessToken = this.accessTokenService.create(user.userId, user.email);
    const refreshToken = await this.refreshTokenService.create(user.userId);

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async refreshAccessToken(token: string) {
    const refreshToken = await this.refreshTokenService.findByToken(token);

    if (!refreshToken)
      throw new UnauthorizedException(ErrorType.INVALID_REFRESH_TOKEN);

    const refreshTokenExpirationDate = DateTime.fromJSDate(
      refreshToken.expiresAt,
    );

    if (DateTime.now() > refreshTokenExpirationDate) {
      await this.refreshTokenService.revoke(
        refreshToken.userId,
        refreshToken.token,
      );

      throw new UnauthorizedException(ErrorType.EXPIRED_REFRESH_TOKEN);
    }

    const user = await this.userService.findById(refreshToken.userId);

    if (!user) throw new UnauthorizedException(ErrorType.INVALID_CREDENTIALS);

    const accessToken = this.accessTokenService.create(user.userId, user.email);

    return { accessToken };
  }

  async logout(userId: string, refreshToken: string) {
    await this.refreshTokenService.revoke(userId, refreshToken);
  }

  async logoutFromAllDevices(userId: string) {
    await this.refreshTokenService.revokeAll(userId);
  }
}
