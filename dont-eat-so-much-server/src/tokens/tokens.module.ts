import { Module } from "@nestjs/common";
import { DrizzleModule } from "src/drizzle/drizzle.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ACCESS_TOKEN_EXPIRY_MINUTES } from "src/constants/constants";
import { AccessTokenService } from "./services/accessToken.service";
import { RefreshTokenService } from "./services/refreshToken.service";

@Module({
  imports: [
    DrizzleModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("ACCESS_TOKEN_SECRET"),
        signOptions: { expiresIn: `${ACCESS_TOKEN_EXPIRY_MINUTES}m` },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [RefreshTokenService, AccessTokenService],
  exports: [RefreshTokenService, AccessTokenService],
})
export class TokensModule {}
