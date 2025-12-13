import { useCallback, useEffect, useState } from "react";
import { useRegisterMutation } from "../api";
import { useTranslation } from "react-i18next";
import { setTranslatedError } from "../../helpers";
import { RegisterFormValues } from "../../../screens/RegisterScreen/RegisterScreen";

export const useRegister = () => {
    const [registerMutation, { isLoading, isSuccess, isError, data, error }] = useRegisterMutation();
    const { t } = useTranslation("errors");
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        setTranslatedError(isError, t, setErrorMessage, error);
    }, [isError, error, t]);

    const register = useCallback(
        (values: RegisterFormValues) => {
            setErrorMessage("");
            const { confirmPassword: _, ...registerValues } = values;
            return registerMutation(registerValues);
        }, [registerMutation]
    );

    return { register, isLoading, isSuccess, isError, error: errorMessage, user: data}
};