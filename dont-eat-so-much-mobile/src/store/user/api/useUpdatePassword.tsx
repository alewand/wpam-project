import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useUpdatePasswordMutation } from "../api";
import { UpdatePasswordRequest } from "../types";
import { useSnackbar } from "../../../components/Snackbar/Snackbar";
import { getErrorType } from "../../helpers";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import { ApiErrorsTranslationMap } from "../../../constants/errors";

export const useUpdatePassword = () => {
  const [updatePasswordMutation, { isLoading }] = useUpdatePasswordMutation();
  const { publish } = useSnackbar();
  const { t } = useTranslation("errors");

  const updatePassword = useCallback(
    async (request: UpdatePasswordRequest): Promise<boolean> => {
      try {
        await updatePasswordMutation(request).unwrap();
        return true;
      } catch (error) {
        const errorType = getErrorType(error as FetchBaseQueryError | SerializedError);
        const translatedMessage = t(ApiErrorsTranslationMap[errorType] || "unknownError");
        publish(translatedMessage);
        return false;
      }
    },
    [updatePasswordMutation, publish, t]
  );

  return { updatePassword, isLoading };
};

