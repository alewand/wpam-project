import { useEffect } from "react";
import { useSnackbar } from "../components/Snackbar/Snackbar";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

interface useDisplayErrorProps {
    isError: boolean;
    error: string | undefined;
    errorRaw?: FetchBaseQueryError | SerializedError;
    action?: () => void;
}

export const useDisplayError = ({ isError, error, errorRaw, action }: useDisplayErrorProps) => {
    const { publish } = useSnackbar();

    useEffect(() => {
        if (isError && error) {
            publish(error);
            if (action) action();
        }
    }, [isError, error, publish, errorRaw, action]);
};