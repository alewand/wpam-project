import { pgEnum } from 'drizzle-orm/pg-core';
import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

export const userRole = pgEnum('user_role', ['admin', 'user']);

export const users = pgTable('users', {
  userId: uuid('user_id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  password: text('password').notNull(),
  role: userRole('role').notNull().default('user'),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
