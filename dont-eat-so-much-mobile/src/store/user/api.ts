import { createApi, FetchArgs } from "@reduxjs/toolkit/query/react";
import { baseApiQuery } from "../api";
import {
  User,
  UpdateNameRequest,
  UpdateEmailRequest,
  UpdatePasswordRequest,
  DeleteAccountRequest,
} from "./types";
import { setUserCredentials, clearUserCredentials } from "../auth/slice";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseApiQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUserProfile: builder.query<User, void>({
      query: (): FetchArgs => ({
        url: `/user/profile`,
        method: "GET",
      }),
      extraOptions: { isPrivate: true },
      providesTags: ["User"],
    }),
    updateName: builder.mutation<User, UpdateNameRequest>({
      query: (body): FetchArgs => ({
        url: `/user/name`,
        method: "PUT",
        body,
      }),
      extraOptions: { isPrivate: true },
      invalidatesTags: ["User"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;
          const state = getState() as any;
          const authState = state.auth;
          if (authState?.accessToken && authState?.refreshToken) {
            dispatch(
              setUserCredentials({
                user: data,
                accessToken: authState.accessToken,
                refreshToken: authState.refreshToken,
              })
            );
          }
        } catch {
          return;
        }
      },
    }),
    updateEmail: builder.mutation<User, UpdateEmailRequest>({
      query: (body): FetchArgs => ({
        url: `/user/email`,
        method: "PUT",
        body,
      }),
      extraOptions: { isPrivate: true },
      invalidatesTags: ["User"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;
          const state = getState() as any;
          const authState = state.auth;
          if (authState?.accessToken && authState?.refreshToken) {
            dispatch(
              setUserCredentials({
                user: data,
                accessToken: authState.accessToken,
                refreshToken: authState.refreshToken,
              })
            );
          }
        } catch {
          return;
        }
      },
    }),
    updatePassword: builder.mutation<User, UpdatePasswordRequest>({
      query: (body): FetchArgs => ({
        url: `/user/password`,
        method: "PUT",
        body,
      }),
      extraOptions: { isPrivate: true },
      invalidatesTags: ["User"],
    }),
    deleteAccount: builder.mutation<User, DeleteAccountRequest>({
      query: (body): FetchArgs => ({
        url: `/user/account`,
        method: "DELETE",
        body,
      }),
      extraOptions: { isPrivate: true },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearUserCredentials());
        } catch {
          return;
        }
      },
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateNameMutation,
  useUpdateEmailMutation,
  useUpdatePasswordMutation,
  useDeleteAccountMutation,
} = userApi;
