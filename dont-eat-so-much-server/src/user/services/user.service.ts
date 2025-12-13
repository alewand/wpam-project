import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { type DrizzleDatabase } from 'src/drizzle/types';
import * as schema from 'src/drizzle/schema';
import { eq } from 'drizzle-orm';
import {
  NewUser,
  User,
  userReturn,
  userWithPasswordReturn,
  UserWithTokens,
} from '../types';
import { AccessTokenService } from 'src/tokens/services/accessToken.service';
import { RefreshTokenService } from 'src/tokens/services/refreshToken.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(DRIZZLE) private db: DrizzleDatabase,
    private refreshTokenService: RefreshTokenService,
    private accessTokenService: AccessTokenService,
  ) {}

  async create(userData: NewUser): Promise<UserWithTokens> {
    const [user] = await this.db
      .insert(schema.users)
      .values({
        ...userData,
        role: 'user',
      })
      .returning(userReturn);

    const refreshToken = await this.refreshTokenService.create(user.userId);
    const accessToken = this.accessTokenService.create(user.userId, user.email);

    return { user, refreshToken, accessToken };
  }

  async update(
    userId: string,
    userData: Partial<NewUser>,
  ): Promise<User | undefined> {
    const [user] = await this.db
      .update(schema.users)
      .set({
        ...userData,
        role: 'user',
      })
      .where(eq(schema.users.userId, userId))
      .returning(userReturn);

    return user;
  }

  async delete(userId: string): Promise<User | undefined> {
    const [deletedUser] = await this.db
      .delete(schema.users)
      .where(eq(schema.users.userId, userId))
      .returning(userReturn);

    return deletedUser;
  }

  async findById(userId: string): Promise<User | undefined> {
    const [user] = await this.db
      .select(userReturn)
      .from(schema.users)
      .where(eq(schema.users.userId, userId))
      .limit(1);

    return user;
  }

  async existsById(userId: string): Promise<boolean> {
    const user = await this.findById(userId);
    return !!user;
  }

  async findByEmail(
    email: string,
  ): Promise<{ user: User | undefined; userPassword: string | undefined }> {
    const [userWithPassword] = await this.db
      .select(userWithPasswordReturn)
      .from(schema.users)
      .where(eq(schema.users.email, email))
      .limit(1);

    if (!userWithPassword) {
      return { user: undefined, userPassword: undefined };
    }

    const { password, ...user } = userWithPassword ?? {};

    return { user, userPassword: password };
  }

  async existsByEmail(email: string): Promise<boolean> {
    const { user } = await this.findByEmail(email);
    return !!user;
  }
}
