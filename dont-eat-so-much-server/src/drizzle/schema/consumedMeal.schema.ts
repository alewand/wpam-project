import { pgTable, uuid, timestamp, date, numeric } from "drizzle-orm/pg-core";
import { users } from "./user.schema";
import { meals } from "../schema";

export const consumedMeals = pgTable("consumed_meals", {
  consumedMealId: uuid("consumed_meal_id").primaryKey().defaultRandom(),
  mealId: uuid("meal_id")
    .references(() => meals.mealId, {
      onDelete: "cascade",
    })
    .notNull(),
  amountInGrams: numeric("amount_in_grams", {
    precision: 8,
    scale: 2,
  }).notNull(),
  consumedAt: date("consumed_at").notNull(),
  consumedBy: uuid("consumed_by")
    .references(() => users.userId, {
      onDelete: "cascade",
    })
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
