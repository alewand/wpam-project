import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserModule } from 'src/user/user.module';
import { TokensModule } from 'src/tokens/tokens.module';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [UserModule, TokensModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
