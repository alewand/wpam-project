import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { RootState } from "./store";
import { clearUserCredentials, updateTokens } from "./auth/slice";
import { getErrorStatus, getErrorType } from "./helpers";
import { EXPIRED_ACCESS_TOKEN } from "../constants/errors";

const API_BASE_URL = "http://192.168.1.213:3000/api/v1";

interface ExtraOptions {
  isPrivate?: boolean;
}

const basePublicApiQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
});

const basePrivateApiQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  ExtraOptions
> = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const rootState = getState() as RootState;
    const accessToken = rootState.auth.accessToken;
    if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);
    return headers;
  },
});

const basePrivateApiQueryWithRefresh: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  ExtraOptions
> = async (args, api, extraOptions) => {
  const queryResult = await basePrivateApiQuery(args, api, extraOptions);

  if (
    !(queryResult.error && getErrorStatus(queryResult.error) === 401) &&
    getErrorType(queryResult.error) !== EXPIRED_ACCESS_TOKEN
  ) {
    return queryResult;
  }

  const rootState = api.getState() as RootState;
  const refreshToken = rootState.auth.refreshToken;

  if (!refreshToken) return queryResult;

  const refreshResult = await basePublicApiQuery(
    {
      url: "/auth/refresh",
      method: "POST",
      body: { refreshToken },
    },
    api,
    extraOptions
  );

  if (refreshResult.error) {
    api.dispatch(clearUserCredentials());
    return queryResult;
  }

  const { accessToken } = refreshResult.data as { accessToken: string };

  api.dispatch(updateTokens({ accessToken }));

  return basePrivateApiQuery(args, api, extraOptions);
};

export const baseApiQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  ExtraOptions
> = (args, api, extraOptions) =>
  extraOptions && extraOptions.isPrivate
    ? basePrivateApiQueryWithRefresh(args, api, extraOptions)
    : basePublicApiQuery(args, api, extraOptions);
