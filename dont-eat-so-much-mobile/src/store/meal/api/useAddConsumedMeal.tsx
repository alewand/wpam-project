import { useCallback, useEffect } from "react";
import { useSnackbar } from "../../../components/Snackbar/Snackbar";
import { selectSelectedDay } from "../../date/selectors";
import { useAppSelector } from "../../store";
import { useAddConsumedMealMutation } from "../api";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { AppNavigation } from "../../../navigation/Navigation";

export const useAddConsumedMeal = () => {
  const navigation = useNavigation<AppNavigation>();
  const [addConsumedMealMutation, { isLoading, error }] = useAddConsumedMealMutation();

  const selectedDay = useAppSelector(selectSelectedDay);

  const { t } = useTranslation("errors");
  const { t: tMeal } = useTranslation("common", { keyPrefix: "consumedMeal" });
  const { publish } = useSnackbar();

  useEffect(() => {
    if (error) {
      publish(t("unknownError"));
      navigateToMeal();
    }
  }, [error, publish, t]);

  const navigateToMeal = useCallback(() => {
    navigation.navigate("BottomTabs", { screen: "Meal" });
  }, [navigation]);

  const addConsumedMeal = async (mealId: string, amountInGrams: number) => {
    const consumedAt = selectedDay.toISODate() ?? "";
    await addConsumedMealMutation({ mealId, consumedAt, amountInGrams }).unwrap();
    publish(tMeal("addMealSuccess"));
    navigateToMeal();
  };

  return {
    addConsumedMeal,
    isLoading,
    error,
  };
};
