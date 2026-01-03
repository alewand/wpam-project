import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useLogoutFromAllDevicesMutation } from "../api";
import { useSnackbar } from "../../../components/Snackbar/Snackbar";
import { getErrorType } from "../../helpers";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import { ApiErrorsTranslationMap } from "../../../constants/errors";

export const useLogoutFromAllDevices = () => {
  const [logoutFromAllDevicesMutation, { isLoading }] = useLogoutFromAllDevicesMutation();
  const { publish } = useSnackbar();
  const { t } = useTranslation("errors");

  const logoutFromAllDevices = useCallback(async (): Promise<boolean> => {
    try {
      await logoutFromAllDevicesMutation().unwrap();
      return true;
    } catch (error) {
      const errorType = getErrorType(error as FetchBaseQueryError | SerializedError);
      const translatedMessage = t(ApiErrorsTranslationMap[errorType] || "unknownError");
      publish(translatedMessage);
      return false;
    }
  }, [logoutFromAllDevicesMutation, publish, t]);

  return { logoutFromAllDevices, isLoading };
};

