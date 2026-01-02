import { IsNotEmpty, IsString } from "class-validator";

export class RefreshAccessTokenDto {
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}

export interface RefreshAccessTokenReturn {
  accessToken: string;
}
