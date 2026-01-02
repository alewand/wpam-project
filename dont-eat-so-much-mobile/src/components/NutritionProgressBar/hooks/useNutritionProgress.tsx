import { useMemo } from "react";
import { useGetConsumedMeals } from "../../../store/meal/api/useGetConsumedMeals";
import type { Meal } from "../../../store/meal/types";
import { calculateNutritionValue } from "../../../hooks/helpers";

const CALORIE_LIMIT = 10000;
const PROTEIN_LIMIT = 1000;
const CARBS_LIMIT = 1000;
const FAT_LIMIT = 1000;
const SATURATED_FAT_LIMIT = 1000;
const SUGARS_LIMIT = 1000;
const FIBER_LIMIT = 1000;
const SALT_LIMIT = 1000;
const SODIUM_LIMIT = 1000;

const calculateNutritions = (grams: number, meal: Meal) => {
  return {
    energyKcal: calculateNutritionValue(meal.energyKcalPer100g, grams),
    protein: calculateNutritionValue(meal.proteinPer100g, grams),
    fat: calculateNutritionValue(meal.fatPer100g, grams),
    carbohydrates: calculateNutritionValue(meal.carbohydratesPer100g, grams),
    saturatedFat: meal.saturatedFatPer100g
      ? calculateNutritionValue(meal.saturatedFatPer100g, grams)
      : undefined,
    sugars: meal.sugarsPer100g ? calculateNutritionValue(meal.sugarsPer100g, grams) : undefined,
    fiber: meal.fiberPer100g ? calculateNutritionValue(meal.fiberPer100g, grams) : undefined,
    salt: meal.saltPer100g ? calculateNutritionValue(meal.saltPer100g, grams) : undefined,
    sodium: meal.sodiumPer100g ? calculateNutritionValue(meal.sodiumPer100g, grams) : undefined,
  };
};

export interface NutritionProgressItem {
  current: number;
  limit: number;
  progress: number;
  isExceeded: boolean;
}

export interface NutritionProgress {
  calories: NutritionProgressItem;
  protein: NutritionProgressItem;
  carbs: NutritionProgressItem;
  fat: NutritionProgressItem;
  saturatedFat?: NutritionProgressItem;
  sugars?: NutritionProgressItem;
  fiber?: NutritionProgressItem;
  salt?: NutritionProgressItem;
  sodium?: NutritionProgressItem;
}

export const useNutritionProgress = (): NutritionProgress => {
  const { consumedMeals } = useGetConsumedMeals();

  const totals = useMemo(() => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    let totalSaturatedFat = 0;
    let totalSugars = 0;
    let totalFiber = 0;
    let totalSalt = 0;
    let totalSodium = 0;

    consumedMeals.forEach((consumedMeal) => {
      const nutritions = calculateNutritions(consumedMeal.amountInGrams, consumedMeal.meal);

      totalCalories += nutritions.energyKcal;
      totalProtein += nutritions.protein;
      totalCarbs += nutritions.carbohydrates;
      totalFat += nutritions.fat;
      if (nutritions.saturatedFat !== undefined) totalSaturatedFat += nutritions.saturatedFat;
      if (nutritions.sugars !== undefined) totalSugars += nutritions.sugars;
      if (nutritions.fiber !== undefined) totalFiber += nutritions.fiber;
      if (nutritions.salt !== undefined) totalSalt += nutritions.salt;
      if (nutritions.sodium !== undefined) totalSodium += nutritions.sodium;
    });

    return {
      calories: totalCalories,
      protein: totalProtein,
      carbs: totalCarbs,
      fat: totalFat,
      saturatedFat: totalSaturatedFat,
      sugars: totalSugars,
      fiber: totalFiber,
      salt: totalSalt,
      sodium: totalSodium,
    };
  }, [consumedMeals]);

  const progress: NutritionProgress = useMemo(
    () => ({
      calories: {
        current: totals.calories,
        limit: CALORIE_LIMIT,
        progress: Math.min(totals.calories / CALORIE_LIMIT, 1),
        isExceeded: totals.calories > CALORIE_LIMIT,
      },
      protein: {
        current: totals.protein,
        limit: PROTEIN_LIMIT,
        progress: Math.min(totals.protein / PROTEIN_LIMIT, 1),
        isExceeded: totals.protein > PROTEIN_LIMIT,
      },
      carbs: {
        current: totals.carbs,
        limit: CARBS_LIMIT,
        progress: Math.min(totals.carbs / CARBS_LIMIT, 1),
        isExceeded: totals.carbs > CARBS_LIMIT,
      },
      fat: {
        current: totals.fat,
        limit: FAT_LIMIT,
        progress: Math.min(totals.fat / FAT_LIMIT, 1),
        isExceeded: totals.fat > FAT_LIMIT,
      },
      saturatedFat: {
        current: totals.saturatedFat,
        limit: SATURATED_FAT_LIMIT,
        progress: Math.min(totals.saturatedFat / SATURATED_FAT_LIMIT, 1),
        isExceeded: totals.saturatedFat > SATURATED_FAT_LIMIT,
      },
      sugars: {
        current: totals.sugars,
        limit: SUGARS_LIMIT,
        progress: Math.min(totals.sugars / SUGARS_LIMIT, 1),
        isExceeded: totals.sugars > SUGARS_LIMIT,
      },
      fiber: {
        current: totals.fiber,
        limit: FIBER_LIMIT,
        progress: Math.min(totals.fiber / FIBER_LIMIT, 1),
        isExceeded: totals.fiber > FIBER_LIMIT,
      },
      salt: {
        current: totals.salt,
        limit: SALT_LIMIT,
        progress: Math.min(totals.salt / SALT_LIMIT, 1),
        isExceeded: totals.salt > SALT_LIMIT,
      },
      sodium: {
        current: totals.sodium,
        limit: SODIUM_LIMIT,
        progress: Math.min(totals.sodium / SODIUM_LIMIT, 1),
        isExceeded: totals.sodium > SODIUM_LIMIT,
      },
    }),
    [totals]
  );

  return progress;
};
