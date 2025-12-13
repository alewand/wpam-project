import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from './user.schema';

export const refreshTokens = pgTable('refresh_tokens', {
  refreshTokenId: uuid('refresh_token_id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.userId, { onDelete: 'cascade' }),
  token: text('token').notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
