import { users } from "src/drizzle/schema";

export type RawUser = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type User = Omit<RawUser, "password" | "createdAt" | "updatedAt">;
export type UserWithPassword = Omit<RawUser, "createdAt" | "updatedAt">;

export interface UserWithTokens {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export const userReturn = {
  userId: users.userId,
  name: users.name,
  email: users.email,
  role: users.role,
};

export const userWithPasswordReturn = {
  ...userReturn,
  password: users.password,
};
