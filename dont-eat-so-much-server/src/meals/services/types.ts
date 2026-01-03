import { meals } from "src/drizzle/schema";

export type RawMeal = typeof meals.$inferSelect;
export type NewMeal = typeof meals.$inferInsert;
export type Meal = Omit<RawMeal, "addedBy" | "createdAt" | "updatedAt">;

export interface MealOFF {
  code: string;
  product_name: string;
  brands?: string | string[];
  nutriments?: {
    calcium_100g?: number;
    carbohydrates_100g?: number;
    ["energy-kcal_100g"]?: number;
    fat_100g?: number;
    fiber_100g?: number;
    proteins_100g?: number;
    salt_100g?: number;
    sodium_100g?: number;
    sugars_100g?: number;
    ["saturated-fat_100g"]?: number;
  };
  image_small_url?: string;
  image_front_url?: string;
}

export interface MealOFFResponse {
  code: string;
  product?: MealOFF;
  status: 0 | 1;
  status_verbose: string;
}

export const mealReturn = {
  mealId: meals.mealId,
  barcode: meals.barcode,
  name: meals.name,
  brand: meals.brand,
  energyKcalPer100g: meals.energyKcalPer100g,
  proteinPer100g: meals.proteinPer100g,
  fatPer100g: meals.fatPer100g,
  carbohydratesPer100g: meals.carbohydratesPer100g,
  saturatedFatPer100g: meals.saturatedFatPer100g,
  sugarsPer100g: meals.sugarsPer100g,
  fiberPer100g: meals.fiberPer100g,
  saltPer100g: meals.saltPer100g,
  sodiumPer100g: meals.sodiumPer100g,
  imageUrl: meals.imageUrl,
};

export interface SearchMealsResponse {
  meals: Meal[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
