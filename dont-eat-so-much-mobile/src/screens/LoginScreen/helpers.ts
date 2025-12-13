import { FormikErrors } from "formik";
import { LoginRequest } from "../../store/auth/types";
import { MAIN_COLOR, SECONDARY_COLOR } from "../../constants/colors";

export const isFormButtonDisabled = (
  isLoading: boolean,
  values: LoginRequest,
  errors: FormikErrors<LoginRequest>
) => {
    const hasErrors = !!errors.email || !!errors.password;
    const hasEmptyFields = !values.email.length || !values.password.length;

    return (isLoading || hasEmptyFields || hasErrors);
}

export const getFormButtonColor = (
  isLoading: boolean,
  values: LoginRequest,
  errors: FormikErrors<LoginRequest>
) => {
    return isFormButtonDisabled(isLoading, values, errors) ? SECONDARY_COLOR : MAIN_COLOR;
}