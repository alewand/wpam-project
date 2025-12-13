import { Inject, Injectable } from '@nestjs/common';
import { createHash, randomBytes } from 'crypto';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { type DrizzleDatabase } from 'src/drizzle/types';
import * as schema from 'src/drizzle/schema';
import { DateTime } from 'luxon';
import { REFRESH_TOKEN_EXPIRY_DAYS } from 'src/constants/constants';
import { and, eq } from 'drizzle-orm';
import { RefreshToken } from '../types';

@Injectable()
export class RefreshTokenService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDatabase) {}

  async create(userId: string): Promise<string> {
    const token = this.generateToken();
    const hashedToken = this.getHashedToken(token);
    const expiresAt = DateTime.now()
      .plus({ days: REFRESH_TOKEN_EXPIRY_DAYS })
      .toJSDate();

    await this.db
      .insert(schema.refreshTokens)
      .values({ userId, token: hashedToken, expiresAt });

    return token;
  }

  async findByToken(token: string): Promise<RefreshToken | undefined> {
    const hashedToken = this.getHashedToken(token);
    const [refreshToken] = await this.db
      .select()
      .from(schema.refreshTokens)
      .where(eq(schema.refreshTokens.token, hashedToken))
      .limit(1);

    return refreshToken;
  }

  async revoke(userId: string, token: string): Promise<void> {
    const hashedToken = this.getHashedToken(token);
    await this.db
      .delete(schema.refreshTokens)
      .where(
        and(
          eq(schema.refreshTokens.userId, userId),
          eq(schema.refreshTokens.token, hashedToken),
        ),
      );
  }

  async revokeAll(userId: string): Promise<void> {
    await this.db
      .delete(schema.refreshTokens)
      .where(eq(schema.refreshTokens.userId, userId));
  }

  private generateToken(): string {
    return randomBytes(128).toString('hex');
  }

  private getHashedToken(token: string): string {
    return createHash('sha512').update(token).digest('hex');
  }
}
