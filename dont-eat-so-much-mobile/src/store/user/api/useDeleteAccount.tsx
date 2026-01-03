import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDeleteAccountMutation } from "../api";
import { DeleteAccountRequest } from "../types";
import { useSnackbar } from "../../../components/Snackbar/Snackbar";
import { getErrorType } from "../../helpers";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import { ApiErrorsTranslationMap } from "../../../constants/errors";

export const useDeleteAccount = () => {
  const [deleteAccountMutation, { isLoading }] = useDeleteAccountMutation();
  const { publish } = useSnackbar();
  const { t } = useTranslation("errors");

  const deleteAccount = useCallback(
    async (request: DeleteAccountRequest): Promise<boolean> => {
      try {
        await deleteAccountMutation(request).unwrap();
        return true;
      } catch (error) {
        const errorType = getErrorType(error as FetchBaseQueryError | SerializedError);
        const translatedMessage = t(ApiErrorsTranslationMap[errorType] || "unknownError");
        publish(translatedMessage);
        return false;
      }
    },
    [deleteAccountMutation, publish, t]
  );

  return { deleteAccount, isLoading };
};

