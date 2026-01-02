import { useCallback } from "react";
import { AppNavigation, BottomTabParamList } from "../../../navigation/Navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import { Meal } from "../../../store/meal/types";
import { useDeleteConsumedMeal } from "../../../store/meal/api/useDeleteConsumedMeal";
import { useGetConsumedMeals } from "../../../store/meal/api/useGetConsumedMeals";

export const useMealScreen = () => {
  const navigation = useNavigation<AppNavigation>();
  const route = useRoute<RouteProp<BottomTabParamList, "Meal">>();
  const { consumedMeals, isLoading } = useGetConsumedMeals();
  const { deleteConsumedMeal, isLoading: isDeletingLoading } = useDeleteConsumedMeal();

  const resetDate = route.params?.resetDate;

  const onCardPress = useCallback(
    (meal: Meal, consumedMealId: string, amountInGrams: number) => {
      navigation.navigate("ConsumedMeal", {
        consumedMealId,
        meal,
        amountInGrams,
        action: "view",
      });
    },
    [navigation]
  );

  const onCardLongPress = useCallback(
    (meal: Meal, consumedMealId: string, amountInGrams: number) => {
      navigation.navigate("ConsumedMeal", {
        consumedMealId,
        meal,
        amountInGrams,
        action: "edit",
      });
    },
    [navigation]
  );

  const onCardDeletePress = useCallback(
    (consumedMealId: string) => {
      deleteConsumedMeal(consumedMealId);
    },
    [deleteConsumedMeal]
  );

  const handleBarcodePress = useCallback(() => {
    navigation.navigate("Scanner");
  }, [navigation]);

  return {
    onCardPress,
    onCardLongPress,
    onCardDeletePress,
    isLoading: isLoading || isDeletingLoading,
    consumedMeals,
    resetDate,
    handleBarcodePress,
  };
};
