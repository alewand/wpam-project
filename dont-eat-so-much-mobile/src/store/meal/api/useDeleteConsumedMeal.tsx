import { useCallback } from "react";
import { useSnackbar } from "../../../components/Snackbar/Snackbar";
import { useDeleteConsumedMealMutation } from "../api";
import { useTranslation } from "react-i18next";

export const useDeleteConsumedMeal = () => {
  const [deleteConsumedMealMutation, { isLoading }] = useDeleteConsumedMealMutation();

  const { t } = useTranslation("errors");
  const { t: tMeal } = useTranslation("common", { keyPrefix: "consumedMeal" });
  const { publish } = useSnackbar();

  const deleteConsumedMeal = useCallback(
    async (consumedMealId: string) => {
      try {
        await deleteConsumedMealMutation(consumedMealId).unwrap();
        publish(tMeal("deleteMealSuccess"));
      } catch {
        publish(t("unknownError"));
      }
    },
    [deleteConsumedMealMutation, publish, tMeal, t]
  );

  return {
    deleteConsumedMeal,
    isLoading,
  };
};
