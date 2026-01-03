import { FormikErrors } from "formik";
import { MAIN_COLOR, SECONDARY_COLOR } from "../../../constants/colors";

type UpdatePasswordFormValues = {
  newPassword: string;
  password: string;
};

type UpdateEmailFormValues = {
  email: string;
  password: string;
};

export const isUpdatePasswordButtonDisabled = (
  isLoading: boolean,
  values: UpdatePasswordFormValues,
  errors: FormikErrors<UpdatePasswordFormValues>
) => {
  const hasErrors = !!errors.newPassword || !!errors.password;
  const hasEmptyFields = !values.newPassword.length || !values.password.length;

  return isLoading || hasEmptyFields || hasErrors;
};

export const getUpdatePasswordButtonColor = (
  isLoading: boolean,
  values: UpdatePasswordFormValues,
  errors: FormikErrors<UpdatePasswordFormValues>
) => {
  return isUpdatePasswordButtonDisabled(isLoading, values, errors) ? SECONDARY_COLOR : MAIN_COLOR;
};

export const isUpdateEmailButtonDisabled = (
  isLoading: boolean,
  values: UpdateEmailFormValues,
  errors: FormikErrors<UpdateEmailFormValues>
) => {
  const hasErrors = !!errors.email || !!errors.password;
  const hasEmptyFields = !values.email.length || !values.password.length;

  return isLoading || hasEmptyFields || hasErrors;
};

export const getUpdateEmailButtonColor = (
  isLoading: boolean,
  values: UpdateEmailFormValues,
  errors: FormikErrors<UpdateEmailFormValues>
) => {
  return isUpdateEmailButtonDisabled(isLoading, values, errors) ? SECONDARY_COLOR : MAIN_COLOR;
};
