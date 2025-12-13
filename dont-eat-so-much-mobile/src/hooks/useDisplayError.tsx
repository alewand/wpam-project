import { useEffect } from "react";
import { useSnackbar } from "../components/Snackbar/Snackbar";

interface useDisplayErrorProps {
    isError: boolean;
    error: string | undefined;
    action?: () => void;
}

export const useDisplayError = ({ isError, error, action }: useDisplayErrorProps) => {
    const { publish } = useSnackbar();

    useEffect(() => {
        if (isError && error) {
            publish(error);
            if (action) action();
        }
    }, [isError, error, publish, action]);
};