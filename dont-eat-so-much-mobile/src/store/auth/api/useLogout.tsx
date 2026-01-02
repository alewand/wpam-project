import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { setTranslatedError } from "../../helpers";
import { useLogoutMutation } from "../api";

export const useLogout = () => {
  const [logoutMutation, { isLoading, isSuccess, isError, error }] = useLogoutMutation();
  const { t } = useTranslation("errors");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    setTranslatedError(isError, t, setErrorMessage, error);
  }, [isError, error, t]);

  const logout = () => {
    setErrorMessage("");
    return logoutMutation();
  };

  return { logout, isLoading, isError, isSuccess, error: errorMessage };
};
