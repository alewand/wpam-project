import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { User } from 'src/user/types';

export class RegisterDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsString()
  @MinLength(10)
  @MaxLength(50)
  password: string;
}

export interface RegisterReturn {
  user: Omit<User, 'password'>;
  accessToken: string;
  refreshToken: string;
}
