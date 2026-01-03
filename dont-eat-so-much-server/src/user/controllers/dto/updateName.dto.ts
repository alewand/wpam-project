import { IsString, MaxLength, MinLength } from "class-validator";

export class UpdateNameDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  name: string;
}
