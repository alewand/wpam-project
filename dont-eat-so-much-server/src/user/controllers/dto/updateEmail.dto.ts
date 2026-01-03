import { IsEmail, IsString, MaxLength } from "class-validator";

export class UpdateEmailDto {
  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsString()
  password: string;
}
