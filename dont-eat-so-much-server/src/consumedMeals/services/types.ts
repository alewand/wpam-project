import { consumedMeals } from "src/drizzle/schema";
import { Meal } from "src/meals/services/types";

export type RawConsumedMeal = typeof consumedMeals.$inferSelect;
export type NewConsumedMeal = typeof consumedMeals.$inferInsert;
export type ConsumedMeal = Omit<
  RawConsumedMeal,
  "consumedBy" | "createdAt" | "updatedAt"
>;
export type ConsumedMealWithMeal = ConsumedMeal & { meal: Meal };

export const consumedMealReturn = {
  consumedMealId: consumedMeals.consumedMealId,
  mealId: consumedMeals.mealId,
  amountInGrams: consumedMeals.amountInGrams,
  consumedAt: consumedMeals.consumedAt,
};
