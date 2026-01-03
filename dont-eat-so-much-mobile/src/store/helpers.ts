import type { Dispatch, SetStateAction } from "react";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { TFunction } from "i18next";
import { ApiErrorsTranslationMap } from "../constants/errors";

export const getErrorStatus = (queryError?: FetchBaseQueryError | SerializedError) => {
  if (queryError && "status" in queryError) return queryError.status;
  if (queryError && "code" in queryError) return queryError.code;
  return undefined;
};

export const getErrorType = (queryError?: FetchBaseQueryError | SerializedError) => {
  if (queryError && "data" in queryError) {
    const errorBody = queryError.data as { message?: string | string[] };
    if (Array.isArray(errorBody.message)) {
      return errorBody.message[0] ?? "";
    }
    return errorBody.message ?? "";
  }

  if (queryError && "message" in queryError) {
    return queryError.message ?? "";
  }

  return "";
};

export const getTranslatedError = (
  error?: FetchBaseQueryError | SerializedError,
  t?: TFunction<"errors", undefined>
): string | undefined => {
  if (!error || !t) return undefined;
  const errorType = getErrorType(error);
  return t(ApiErrorsTranslationMap[errorType] || "errors:unknownError");
};

export const setTranslatedError = (
  isError: boolean,
  t: TFunction<"errors", undefined>,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  error?: FetchBaseQueryError | SerializedError
) => {
  if (isError && error) {
    const errorType = getErrorType(error);
    const translatedMessage = t(ApiErrorsTranslationMap[errorType] || "errors:unknownError");
    setErrorMessage(translatedMessage);
  }
};
