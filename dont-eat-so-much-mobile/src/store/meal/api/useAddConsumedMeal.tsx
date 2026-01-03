import { useCallback } from "react";
import { useSnackbar } from "../../../components/Snackbar/Snackbar";
import { selectSelectedDay } from "../../date/selectors";
import { useAppSelector } from "../../store";
import { useAddConsumedMealMutation } from "../api";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { AppNavigation } from "../../../navigation/Navigation";
import { getErrorType } from "../../helpers";
import { ApiErrorsTranslationMap } from "../../../constants/errors";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

export const useAddConsumedMeal = () => {
  const navigation = useNavigation<AppNavigation>();
  const [addConsumedMealMutation, { isLoading }] = useAddConsumedMealMutation();

  const selectedDay = useAppSelector(selectSelectedDay);

  const { t } = useTranslation("errors");
  const { t: tMeal } = useTranslation("common", { keyPrefix: "consumedMeal" });
  const { publish } = useSnackbar();

  const navigateToMeal = useCallback(() => {
    navigation.navigate("BottomTabs", { screen: "Meal", params: { resetDate: false } });
  }, [navigation]);

  const addConsumedMeal = useCallback(
    async (mealId: string, amountInGrams: number) => {
      const consumedAt = selectedDay.toISODate() ?? "";
      try {
        await addConsumedMealMutation({ mealId, consumedAt, amountInGrams }).unwrap();
        publish(tMeal("addMealSuccess"));
      } catch (error) {
        const errorType = getErrorType(error as FetchBaseQueryError | SerializedError);
        const translatedMessage = t(ApiErrorsTranslationMap[errorType] || "unknownError");
        publish(translatedMessage);
      } finally {
        navigateToMeal();
      }
    },
    [addConsumedMealMutation, selectedDay, publish, tMeal, t, navigateToMeal]
  );

  return {
    addConsumedMeal,
    isLoading,
  };
};
