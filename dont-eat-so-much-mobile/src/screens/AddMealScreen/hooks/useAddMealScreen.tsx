import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { AppNavigation } from "../../../navigation/Navigation";
import { useAddCustomMeal } from "../../../store/meal/api/useAddCustomMeal";
import type { CreateMealRequest } from "../../../store/meal/types";

export const useAddMealScreen = () => {
  const navigation = useNavigation<AppNavigation>();
  const { createMeal, isLoading } = useAddCustomMeal();

  const handleSubmit = useCallback(
    async (values: CreateMealRequest) => {
      const optionalNumber = (val: number | null | undefined): number | undefined => {
        return val !== null && val !== undefined && !isNaN(val) && val !== 0 ? val : undefined;
      };

      const mealData: CreateMealRequest = {
        name: values.name.trim(),
        brand: values.brand?.trim() || undefined,
        barcode: values.barcode?.trim() || undefined,
        energyKcalPer100g: values.energyKcalPer100g,
        proteinPer100g: values.proteinPer100g,
        fatPer100g: values.fatPer100g,
        carbohydratesPer100g: values.carbohydratesPer100g,
        saturatedFatPer100g: optionalNumber(values.saturatedFatPer100g),
        sugarsPer100g: optionalNumber(values.sugarsPer100g),
        fiberPer100g: optionalNumber(values.fiberPer100g),
        saltPer100g: optionalNumber(values.saltPer100g),
        sodiumPer100g: optionalNumber(values.sodiumPer100g),
      };

      const createdMeal = await createMeal(mealData);

      if (createdMeal) {
        navigation.navigate("ConsumedMeal", {
          meal: createdMeal,
          action: "add",
          source: "AddMeal",
        });
      }
    },
    [createMeal, navigation]
  );

  return {
    handleSubmit,
    isLoading,
  };
};
