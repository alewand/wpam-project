import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { User } from 'src/user/types';

export class LoginDto {
  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsString()
  @MinLength(10)
  @MaxLength(50)
  password: string;
}

export interface LoginReturn {
  user: Omit<User, 'password'>;
  accessToken: string;
  refreshToken: string;
}
