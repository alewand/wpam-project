import { Injectable } from "@nestjs/common";
import { SALT_ROUNDS } from "src/constants/constants";
import * as bcrypt from "bcrypt";

@Injectable()
export class PasswordService {
  async getHashedPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, SALT_ROUNDS);
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
