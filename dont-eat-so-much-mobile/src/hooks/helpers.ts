export const calculateNutritionValue = (per100gValue: number, grams: number): number => {
  return Math.round(((per100gValue * grams) / 100) * 10) / 10;
};
