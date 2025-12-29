import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Version,
} from "@nestjs/common";

import { AuthGuard, type AuthUserPayload } from "src/guards/auth.guard";
import { CurrentUser } from "src/guards/decorators/currentUser";
import { AuthService } from "../services/auth.service";
import { RegisterDto, RegisterReturn } from "./dto/register.dto";
import { LoginDto, LoginReturn } from "./dto/login.dto";
import {
  RefreshAccessTokenDto,
  RefreshAccessTokenReturn,
} from "./dto/refresh-access-token.dto";
import { LogoutDto } from "./dto/logout.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Version("1")
  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  async registerV1(@Body() registerDto: RegisterDto): Promise<RegisterReturn> {
    const { user, accessToken, refreshToken } =
      await this.authService.register(registerDto);

    return { user, accessToken, refreshToken };
  }

  @Version("1")
  @Post("login")
  @HttpCode(HttpStatus.OK)
  async loginV1(@Body() loginDto: LoginDto): Promise<LoginReturn> {
    const { user, accessToken, refreshToken } =
      await this.authService.login(loginDto);

    return { user, accessToken, refreshToken };
  }

  @Version("1")
  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  async refreshV1(
    @Body() refreshDto: RefreshAccessTokenDto,
  ): Promise<RefreshAccessTokenReturn> {
    const { accessToken } = await this.authService.refreshAccessToken(
      refreshDto.refreshToken,
    );
    return { accessToken };
  }

  @Version("1")
  @Delete("logout")
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async logoutV1(
    @CurrentUser() user: AuthUserPayload,
    @Body() logoutDto: LogoutDto,
  ): Promise<void> {
    await this.authService.logout(user.userId, logoutDto.refreshToken);
  }

  @Version("1")
  @Delete("logout-all")
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async logoutAllV1(@CurrentUser() user: AuthUserPayload): Promise<void> {
    await this.authService.logoutFromAllDevices(user.userId);
  }
}
