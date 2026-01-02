import { timestamp, varchar } from "drizzle-orm/pg-core";
import { real } from "drizzle-orm/pg-core";
import { uuid } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { users } from "./user.schema";
import { IMAGE_URL_LIMIT } from "src/constants/constants";

export const meals = pgTable("meals", {
  mealId: uuid("meal_id").primaryKey().defaultRandom(),

  barcode: varchar("barcode", { length: 32 }).unique(),
  name: varchar("name", { length: 128 }).notNull(),
  brand: varchar("brand", { length: 128 }),

  energyKcalPer100g: real("energy_kcal_per_100g").notNull(),
  proteinPer100g: real("protein_per_100g").notNull(),
  fatPer100g: real("fat_per_100g").notNull(),
  carbohydratesPer100g: real("carbohydrates_per_100g").notNull(),

  saturatedFatPer100g: real("saturated_fat_per_100g"),
  sugarsPer100g: real("sugars_per_100g"),
  fiberPer100g: real("fiber_per_100g"),
  saltPer100g: real("salt_per_100g"),
  sodiumPer100g: real("sodium_per_100g"),

  imageUrl: varchar("image_url", { length: IMAGE_URL_LIMIT }),

  addedBy: uuid("added_by").references(() => users.userId, {
    onDelete: "set null",
  }),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
