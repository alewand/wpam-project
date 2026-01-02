import { useCallback, useMemo } from "react";
import { Meal, Nutritions } from "../../../store/meal/types";

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

  const calculateNutritionValue = useCallback(
    (per100gValue: number): number => {
      return Math.round(((per100gValue * grams) / 100) * 10) / 10;
    },
    [grams]
  );

  const nutritions: Nutritions = useMemo(
    () => ({
      energyKcal: calculateNutritionValue(energyKcalPer100g),
      protein: calculateNutritionValue(proteinPer100g),
      fat: calculateNutritionValue(fatPer100g),
      carbohydrates: calculateNutritionValue(carbohydratesPer100g),
      saturatedFat: saturatedFatPer100g ? calculateNutritionValue(saturatedFatPer100g) : undefined,
      sugars: sugarsPer100g ? calculateNutritionValue(sugarsPer100g) : undefined,
      fiber: fiberPer100g ? calculateNutritionValue(fiberPer100g) : undefined,
      salt: saltPer100g ? calculateNutritionValue(saltPer100g) : undefined,
      sodium: sodiumPer100g ? calculateNutritionValue(sodiumPer100g) : undefined,
    }),
    [
      calculateNutritionValue,
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
