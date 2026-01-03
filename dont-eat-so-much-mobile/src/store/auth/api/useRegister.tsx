import { useCallback } from "react";
import { useRegisterMutation } from "../api";
import { useTranslation } from "react-i18next";
import { getErrorType } from "../../helpers";
import { RegisterFormValues } from "../../../screens/RegisterScreen/RegisterScreen";
import { useSnackbar } from "../../../components/Snackbar/Snackbar";
import { ApiErrorsTranslationMap } from "../../../constants/errors";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

export const useRegister = () => {
  const [registerMutation, { isLoading, isSuccess, data, error }] = useRegisterMutation();
  const { t } = useTranslation("errors");
  const { publish } = useSnackbar();

  const register = useCallback(
    async (values: RegisterFormValues) => {
      const { confirmPassword: _, ...registerValues } = values;
      try {
        const result = await registerMutation(registerValues).unwrap();
        return result;
      } catch (error) {
        const errorType = getErrorType(error as FetchBaseQueryError | SerializedError);
        const translatedMessage = t(ApiErrorsTranslationMap[errorType] || "unknownError");
        publish(translatedMessage);
        throw error;
      }
    },
    [registerMutation, t, publish]
  );

  return { register, isLoading, isSuccess, user: data, errorRaw: error };
};
