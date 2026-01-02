import { useCallback } from "react";
import { useSnackbar } from "../../../components/Snackbar/Snackbar";
import { useEditConsumedMealMutation } from "../api";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { AppNavigation } from "../../../navigation/Navigation";
import { useAppSelector } from "../../store";
import { selectSelectedDay } from "../../date/selectors";

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
      } catch {
        publish(t("unknownError"));
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
