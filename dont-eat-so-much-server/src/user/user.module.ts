import { Module } from "@nestjs/common";
import { UserService } from "./services/user.service";
import { DrizzleModule } from "src/drizzle/drizzle.module";
import { TokensModule } from "src/tokens/tokens.module";
import { PasswordService } from "./services/password.service";
import { UserApiService } from "./services/userApi.service";
import { UserController } from "./controllers/user.controller";

@Module({
  imports: [DrizzleModule, TokensModule],
  controllers: [UserController],
  providers: [UserService, PasswordService, UserApiService],
  exports: [UserService, PasswordService],
})
export class UserModule {}
