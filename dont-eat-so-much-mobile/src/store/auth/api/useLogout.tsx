import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { getErrorType } from "../../helpers";
import { useLogoutMutation } from "../api";
import { useSnackbar } from "../../../components/Snackbar/Snackbar";
import { ApiErrorsTranslationMap } from "../../../constants/errors";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { useAppSelector } from "../../store";
import { selectRefreshToken } from "../selectors";

export const useLogout = () => {
  const [logoutMutation, { isLoading }] = useLogoutMutation();
  const { t } = useTranslation("errors");
  const { publish } = useSnackbar();
  const refreshToken = useAppSelector(selectRefreshToken);

  const logout = useCallback(async () => {
    if (!refreshToken) {
      return;
    }
    try {
      await logoutMutation({ refreshToken }).unwrap();
    } catch (error) {
      const errorType = getErrorType(error as FetchBaseQueryError | SerializedError);
      const translatedMessage = t(ApiErrorsTranslationMap[errorType] || "unknownError");
      publish(translatedMessage);
    }
  }, [logoutMutation, refreshToken, t, publish]);

  return { logout, isLoading };
};
