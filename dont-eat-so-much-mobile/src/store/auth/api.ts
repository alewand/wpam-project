import { createApi } from "@reduxjs/toolkit/query/react";

import { baseApiQuery } from "../api";
import { UserResponse, LoginRequest, RegisterRequest } from "./types";
import { clearUserCredentials, setUserCredentials } from "./slice";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseApiQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserCredentials(data));
        } catch {
          return;
        }
      },
      invalidatesTags: ["User"],
    }),
    register: builder.mutation<UserResponse, RegisterRequest>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserCredentials(data));
        } catch {
          return;
        }
      },
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation<void, { refreshToken: string }>({
      query: (body) => ({
        url: "/auth/logout",
        method: "DELETE",
        body,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearUserCredentials());
        } catch {
          return;
        }
      },
      invalidatesTags: ["User"],
      extraOptions: { isPrivate: true },
    }),
    logoutFromAllDevices: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout-all",
        method: "DELETE",
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearUserCredentials());
        } catch {
          return;
        }
      },
      invalidatesTags: ["User"],
      extraOptions: { isPrivate: true },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useLogoutFromAllDevicesMutation,
} = authApi;
