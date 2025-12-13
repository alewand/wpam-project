import { refreshTokens } from 'src/drizzle/schema';

export type RefreshToken = typeof refreshTokens.$inferSelect;
