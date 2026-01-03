export interface Meal {
  mealId: string;
  barcode?: string;
  name: string;
  brand?: string;
  energyKcalPer100g: number;
  proteinPer100g: number;
  fatPer100g: number;
  carbohydratesPer100g: number;
  saturatedFatPer100g?: number;
  sugarsPer100g?: number;
  fiberPer100g?: number;
  saltPer100g?: number;
  sodiumPer100g?: number;
  imageUrl?: string;
}

export interface ConsumedMeal {
  consumedMealId: string;
  mealId: string;
  consumedAt: string;
  amountInGrams: number;
  meal: Meal;
}

export interface Nutritions {
  energyKcal: number;
  protein: number;
  fat: number;
  carbohydrates: number;
  saturatedFat?: number;
  sugars?: number;
  fiber?: number;
  salt?: number;
  sodium?: number;
}

export interface AddConsumedMealRequest {
  mealId: string;
  consumedAt: string;
  amountInGrams: number;
}

export interface EditConsumedMealRequest extends AddConsumedMealRequest {
  consumedMealId: string;
}

export interface SearchMealsParams {
  query: string;
  page?: number;
  limit?: number;
  onlyMyMeals?: boolean;
}

export interface SearchMealsResponse {
  meals: Meal[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateMealRequest {
  barcode?: string;
  name: string;
  brand?: string;
  energyKcalPer100g: number;
  proteinPer100g: number;
  fatPer100g: number;
  carbohydratesPer100g: number;
  saturatedFatPer100g?: number | null;
  sugarsPer100g?: number | null;
  fiberPer100g?: number | null;
  saltPer100g?: number | null;
  sodiumPer100g?: number | null;
}
