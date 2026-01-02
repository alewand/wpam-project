import { FormikErrors } from "formik";
import { RegisterFormValues } from "./RegisterScreen";
import { MAIN_COLOR, SECONDARY_COLOR } from "../../constants/colors";

export const isFormButtonDisabled = (
  isLoading: boolean,
  values: RegisterFormValues,
  errors: FormikErrors<RegisterFormValues>
) => {
  const hasErrors =
    !!errors.name || !!errors.email || !!errors.password || !!errors.confirmPassword;
  const hasEmptyFields =
    !values.email.length ||
    !values.password.length ||
    !values.name.length ||
    !values.confirmPassword.length;

  return isLoading || hasEmptyFields || hasErrors;
};

export const getFormButtonColor = (
  isLoading: boolean,
  values: RegisterFormValues,
  errors: FormikErrors<RegisterFormValues>
) => {
  return isFormButtonDisabled(isLoading, values, errors) ? SECONDARY_COLOR : MAIN_COLOR;
};
