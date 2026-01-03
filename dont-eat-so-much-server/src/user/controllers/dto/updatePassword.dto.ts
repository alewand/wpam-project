import { IsString, MaxLength, MinLength } from "class-validator";

export class UpdatePasswordDto {
  @IsString()
  @MinLength(10)
  @MaxLength(50)
  newPassword: string;

  @IsString()
  password: string;
}
