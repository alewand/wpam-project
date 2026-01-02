import { useMemo } from "react";
import { Meal, Nutritions } from "../store/meal/types";
import { calculateNutritionValue } from "./helpers";

export interface UseCalculateNutritionsProps {
  grams: number;
  meal: Meal;
}

export const useCalculateNutritions = ({ grams, meal }: UseCalculateNutritionsProps) => {
  const {
    energyKcalPer100g,
    proteinPer100g,
    fatPer100g,
    carbohydratesPer100g,
    saturatedFatPer100g,
    sugarsPer100g,
    fiberPer100g,
    saltPer100g,
    sodiumPer100g,
  } = meal;

  const nutritions: Nutritions = useMemo(
    () => ({
      energyKcal: calculateNutritionValue(energyKcalPer100g, grams),
      protein: calculateNutritionValue(proteinPer100g, grams),
      fat: calculateNutritionValue(fatPer100g, grams),
      carbohydrates: calculateNutritionValue(carbohydratesPer100g, grams),
      saturatedFat: saturatedFatPer100g
        ? calculateNutritionValue(saturatedFatPer100g, grams)
        : undefined,
      sugars: sugarsPer100g ? calculateNutritionValue(sugarsPer100g, grams) : undefined,
      fiber: fiberPer100g ? calculateNutritionValue(fiberPer100g, grams) : undefined,
      salt: saltPer100g ? calculateNutritionValue(saltPer100g, grams) : undefined,
      sodium: sodiumPer100g ? calculateNutritionValue(sodiumPer100g, grams) : undefined,
    }),
    [
      grams,
      energyKcalPer100g,
      proteinPer100g,
      fatPer100g,
      carbohydratesPer100g,
      saturatedFatPer100g,
      sugarsPer100g,
      fiberPer100g,
      saltPer100g,
      sodiumPer100g,
    ]
  );

  return { nutritions };
};
