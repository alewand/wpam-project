import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { TokensModule } from 'src/tokens/tokens.module';
import { PasswordService } from './services/password.service';

@Module({
  imports: [DrizzleModule, TokensModule],
  providers: [UserService, PasswordService],
  exports: [UserService, PasswordService],
})
export class UserModule {}
