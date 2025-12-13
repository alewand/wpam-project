import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ErrorType } from 'src/errors/types';
import { AccessTokenService } from 'src/tokens/services/accessToken.service';

export const USER_KEY = 'user';

export interface AuthUserPayload {
  userId: string;
  email: string;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private accessTokenService: AccessTokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException(ErrorType.INVALID_ACCESS_TOKEN);

    const user = await this.accessTokenService.verify(token);
    request.user = user;

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
