import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useUpdateEmailMutation } from "../api";
import { UpdateEmailRequest } from "../types";
import { useSnackbar } from "../../../components/Snackbar/Snackbar";
import { getErrorType } from "../../helpers";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import { ApiErrorsTranslationMap } from "../../../constants/errors";

export const useUpdateEmail = () => {
  const [updateEmailMutation, { isLoading }] = useUpdateEmailMutation();
  const { publish } = useSnackbar();
  const { t } = useTranslation("errors");

  const updateEmail = useCallback(
    async (request: UpdateEmailRequest): Promise<boolean> => {
      try {
        await updateEmailMutation(request).unwrap();
        return true;
      } catch (error) {
        const errorType = getErrorType(error as FetchBaseQueryError | SerializedError);
        const translatedMessage = t(ApiErrorsTranslationMap[errorType] || "unknownError");
        publish(translatedMessage);
        return false;
      }
    },
    [updateEmailMutation, publish, t]
  );

  return { updateEmail, isLoading };
};

