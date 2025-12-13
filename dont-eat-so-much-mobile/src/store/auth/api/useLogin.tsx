import { useTranslation } from "react-i18next";
import { setTranslatedError } from "../../helpers";
import { LoginRequest } from "../types";
import { useCallback, useEffect, useState } from "react";
import { useLoginMutation } from "../api";

export const useLogin = () => {
    const [loginMutation, { isLoading, isSuccess, isError, data, error }] = useLoginMutation();
    const { t } = useTranslation("errors");
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        setTranslatedError(isError, t, setErrorMessage, error);
    }, [isError, error, t]);

    const login = useCallback(
        (values: LoginRequest) => {
            setErrorMessage("");
            return loginMutation(values);
        }, [loginMutation]
    );

    return { login, isLoading, isSuccess, isError, error: errorMessage, user: data}
}