import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useUpdateNameMutation } from "../api";
import { UpdateNameRequest } from "../types";
import { useSnackbar } from "../../../components/Snackbar/Snackbar";
import { getErrorType } from "../../helpers";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import { ApiErrorsTranslationMap } from "../../../constants/errors";

export const useUpdateName = () => {
  const [updateNameMutation, { isLoading }] = useUpdateNameMutation();
  const { publish } = useSnackbar();
  const { t } = useTranslation("errors");

  const updateName = useCallback(
    async (request: UpdateNameRequest): Promise<boolean> => {
      try {
        await updateNameMutation(request).unwrap();
        return true;
      } catch (error) {
        const errorType = getErrorType(error as FetchBaseQueryError | SerializedError);
        const translatedMessage = t(ApiErrorsTranslationMap[errorType] || "unknownError");
        publish(translatedMessage);
        return false;
      }
    },
    [updateNameMutation, publish, t]
  );

  return { updateName, isLoading };
};

