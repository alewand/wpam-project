import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  UseGuards,
  Version,
} from "@nestjs/common";
import { AuthGuard, type AuthUserPayload } from "src/guards/auth.guard";
import { CurrentUser } from "src/guards/decorators/currentUser";
import { UserApiService } from "../services/userApi.service";
import { UpdateNameDto } from "./dto/updateName.dto";
import { UpdateEmailDto } from "./dto/updateEmail.dto";
import { UpdatePasswordDto } from "./dto/updatePassword.dto";
import { DeleteAccountDto } from "./dto/deleteAccount.dto";

@Controller("user")
export class UserController {
  constructor(private userApiService: UserApiService) {}

  @Version("1")
  @Get("profile")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getProfileV1(@CurrentUser() user: AuthUserPayload) {
    return this.userApiService.getUserProfile(user.userId);
  }

  @Version("1")
  @Put("name")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async updateNameV1(
    @CurrentUser() user: AuthUserPayload,
    @Body() updateNameDto: UpdateNameDto,
  ) {
    return this.userApiService.updateName(user.userId, updateNameDto);
  }

  @Version("1")
  @Put("email")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async updateEmailV1(
    @CurrentUser() user: AuthUserPayload,
    @Body() updateEmailDto: UpdateEmailDto,
  ) {
    return this.userApiService.updateEmail(user.userId, updateEmailDto);
  }

  @Version("1")
  @Put("password")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async updatePasswordV1(
    @CurrentUser() user: AuthUserPayload,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.userApiService.updatePassword(user.userId, updatePasswordDto);
  }

  @Version("1")
  @Delete("account")
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  async deleteAccountV1(
    @CurrentUser() user: AuthUserPayload,
    @Body() deleteAccountDto: DeleteAccountDto,
  ): Promise<void> {
    await this.userApiService.deleteAccount(user.userId, deleteAccountDto);
  }
}
