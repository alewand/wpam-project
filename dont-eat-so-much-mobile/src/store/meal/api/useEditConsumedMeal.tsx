import { useCallback } from "react";
import { useSnackbar } from "../../../components/Snackbar/Snackbar";
import { useEditConsumedMealMutation } from "../api";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { AppNavigation } from "../../../navigation/Navigation";
import { useAppSelector } from "../../store";
import { selectSelectedDay } from "../../date/selectors";
import { getErrorType } from "../../helpers";
import { ApiErrorsTranslationMap } from "../../../constants/errors";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

export const useEditConsumedMeal = () => {
  const navigation = useNavigation<AppNavigation>();
  const [editConsumedMealMutation, { isLoading }] = useEditConsumedMealMutation();

  const selectedDay = useAppSelector(selectSelectedDay);

  const { t } = useTranslation("errors");
  const { t: tMeal } = useTranslation("common", { keyPrefix: "consumedMeal" });
  const { publish } = useSnackbar();

  const navigateToMeal = useCallback(() => {
    navigation.navigate("BottomTabs", { screen: "Meal", params: { resetDate: false } });
  }, [navigation]);

  const editConsumedMeal = useCallback(
    async (consumedMealId: string, mealId: string, amountInGrams: number) => {
      const consumedAt = selectedDay.toISODate() ?? "";

      const consumedMealToEdit = {
        consumedMealId,
        mealId,
        consumedAt,
        amountInGrams,
      };

      try {
        await editConsumedMealMutation(consumedMealToEdit).unwrap();
        publish(tMeal("editMealSuccess"));
      } catch (error) {
        const errorType = getErrorType(error as FetchBaseQueryError | SerializedError);
        const translatedMessage = t(ApiErrorsTranslationMap[errorType] || "unknownError");
        publish(translatedMessage);
      } finally {
        navigateToMeal();
      }
    },
    [editConsumedMealMutation, selectedDay, publish, tMeal, t, navigateToMeal]
  );

  return {
    editConsumedMeal,
    isLoading,
  };
};
