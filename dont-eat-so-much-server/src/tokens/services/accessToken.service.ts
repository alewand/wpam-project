import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService, TokenExpiredError } from "@nestjs/jwt";
import { DateTime } from "luxon";
import { ACCESS_TOKEN_ISS } from "src/constants/constants";
import { ErrorType } from "src/errors/types";
import { AuthUserPayload } from "src/guards/auth.guard";

export interface AccessTokenPayload {
  sub: string;
  email: string;
  iat: number;
  iss: string;
}

@Injectable()
export class AccessTokenService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  create(userId: string, email: string): string {
    const payload: AccessTokenPayload = {
      sub: userId,
      email,
      iat: DateTime.now().toUnixInteger(),
      iss: ACCESS_TOKEN_ISS,
    };

    return this.jwtService.sign(payload, {
      secret: this.getSecret(),
    });
  }

  async verify(token: string): Promise<AuthUserPayload> {
    try {
      const { sub, email } =
        await this.jwtService.verifyAsync<AccessTokenPayload>(token, {
          secret: this.getSecret(),
        });

      return { userId: sub, email };
    } catch (error: unknown) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException(ErrorType.EXPIRED_ACCESS_TOKEN);
      }

      throw new UnauthorizedException(ErrorType.INVALID_ACCESS_TOKEN);
    }
  }

  private getSecret(): string | undefined {
    return this.configService.get<string>("ACCESS_TOKEN_SECRET");
  }
}
