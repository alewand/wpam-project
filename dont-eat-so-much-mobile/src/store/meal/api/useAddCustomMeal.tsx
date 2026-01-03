import { useCallback } from "react";
import { useCreateMealMutation } from "../api";
import type { CreateMealRequest, Meal } from "../types";
import { useSnackbar } from "../../../components/Snackbar/Snackbar";
import { useTranslation } from "react-i18next";
import { getErrorType } from "../../helpers";
import { ApiErrorsTranslationMap } from "../../../constants/errors";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

export const useCreateMeal = () => {
  const [createMeal, { isLoading }] = useCreateMealMutation();
  const { publish } = useSnackbar();
  const { t } = useTranslation("errors");

  const createCustomMeal = useCallback(
    async (meal: CreateMealRequest): Promise<Meal | null> => {
      try {
        const result = await createMeal(meal).unwrap();
        return result;
      } catch (error) {
        const errorType = getErrorType(error as FetchBaseQueryError | SerializedError);
        const translatedMessage = t(ApiErrorsTranslationMap[errorType] || "unknownError");
        publish(translatedMessage);
        return null;
      }
    },
    [createMeal, publish, t]
  );

  return {
    createMeal: createCustomMeal,
    isLoading,
  };
};
