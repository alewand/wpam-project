import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { ErrorType } from "src/errors/types";
import { UserService } from "./user.service";
import { PasswordService } from "./password.service";
import { RefreshTokenService } from "src/tokens/services/refreshToken.service";
import { UpdateNameDto } from "../controllers/dto/updateName.dto";
import { UpdateEmailDto } from "../controllers/dto/updateEmail.dto";
import { UpdatePasswordDto } from "../controllers/dto/updatePassword.dto";
import { DeleteAccountDto } from "../controllers/dto/deleteAccount.dto";

@Injectable()
export class UserApiService {
  constructor(
    private userService: UserService,
    private passwordService: PasswordService,
    private refreshTokenService: RefreshTokenService,
  ) {}

  async getUserProfile(userId: string) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException(ErrorType.INVALID_CREDENTIALS);
    }
    return user;
  }

  async updateName(userId: string, updateNameDto: UpdateNameDto) {
    const user = await this.userService.update(userId, {
      name: updateNameDto.name,
    });
    if (!user) {
      throw new UnauthorizedException(ErrorType.INVALID_CREDENTIALS);
    }
    return user;
  }

  async updateEmail(userId: string, updateEmailDto: UpdateEmailDto) {
    const { user, userPassword } =
      await this.userService.findByIdWithPassword(userId);

    if (!user || !userPassword) {
      throw new UnauthorizedException(ErrorType.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await this.passwordService.comparePasswords(
      updateEmailDto.password,
      userPassword,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(ErrorType.INVALID_CREDENTIALS);
    }

    const emailExists = await this.userService.existsByEmail(
      updateEmailDto.email,
    );

    if (emailExists) {
      throw new ConflictException(ErrorType.USER_ALREADY_EXISTS);
    }

    const updatedUser = await this.userService.update(userId, {
      email: updateEmailDto.email,
    });

    if (!updatedUser) {
      throw new UnauthorizedException(ErrorType.INVALID_CREDENTIALS);
    }

    return updatedUser;
  }

  async updatePassword(userId: string, updatePasswordDto: UpdatePasswordDto) {
    const { user, userPassword } =
      await this.userService.findByIdWithPassword(userId);

    if (!user || !userPassword) {
      throw new UnauthorizedException(ErrorType.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await this.passwordService.comparePasswords(
      updatePasswordDto.password,
      userPassword,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(ErrorType.INVALID_CREDENTIALS);
    }

    const hashedPassword = await this.passwordService.getHashedPassword(
      updatePasswordDto.newPassword,
    );

    const updatedUser = await this.userService.update(userId, {
      password: hashedPassword,
    });

    if (!updatedUser) {
      throw new UnauthorizedException(ErrorType.INVALID_CREDENTIALS);
    }

    return updatedUser;
  }

  async deleteAccount(
    userId: string,
    deleteAccountDto: DeleteAccountDto,
  ): Promise<void> {
    const { user, userPassword } =
      await this.userService.findByIdWithPassword(userId);

    if (!user || !userPassword) {
      throw new UnauthorizedException(ErrorType.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await this.passwordService.comparePasswords(
      deleteAccountDto.password,
      userPassword,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(ErrorType.INVALID_CREDENTIALS);
    }

    await this.refreshTokenService.revokeAll(userId);
    await this.userService.delete(userId);
  }
}
