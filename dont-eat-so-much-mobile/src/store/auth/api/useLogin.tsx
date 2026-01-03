import { useTranslation } from "react-i18next";
import { getErrorType } from "../../helpers";
import { LoginRequest } from "../types";
import { useCallback } from "react";
import { useLoginMutation } from "../api";
import { useSnackbar } from "../../../components/Snackbar/Snackbar";
import { ApiErrorsTranslationMap } from "../../../constants/errors";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

export const useLogin = () => {
  const [loginMutation, { isLoading, isSuccess, data, error }] = useLoginMutation();
  const { t } = useTranslation("errors");
  const { publish } = useSnackbar();

  const login = useCallback(
    async (values: LoginRequest) => {
      try {
        const result = await loginMutation(values).unwrap();
        return result;
      } catch (error) {
        const errorType = getErrorType(error as FetchBaseQueryError | SerializedError);
        const translatedMessage = t(ApiErrorsTranslationMap[errorType] || "unknownError");
        publish(translatedMessage);
        throw error;
      }
    },
    [loginMutation, t, publish]
  );

  return { login, isLoading, isSuccess, user: data, errorRaw: error };
};
