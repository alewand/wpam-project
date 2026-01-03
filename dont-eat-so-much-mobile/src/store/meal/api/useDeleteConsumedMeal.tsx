import { useCallback } from "react";
import { useSnackbar } from "../../../components/Snackbar/Snackbar";
import { useDeleteConsumedMealMutation } from "../api";
import { useTranslation } from "react-i18next";
import { getErrorType } from "../../helpers";
import { ApiErrorsTranslationMap } from "../../../constants/errors";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

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
      } catch (error) {
        const errorType = getErrorType(error as FetchBaseQueryError | SerializedError);
        const translatedMessage = t(ApiErrorsTranslationMap[errorType] || "unknownError");
        publish(translatedMessage);
      }
    },
    [deleteConsumedMealMutation, publish, tMeal, t]
  );

  return {
    deleteConsumedMeal,
    isLoading,
  };
};
