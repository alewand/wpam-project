import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../store";

const selectAuthState = createSelector(
  (state: RootState) => state.auth,
  (auth) => auth
);

export const selectIsAuthenticated = createSelector(selectAuthState, (auth) => {
  return !!auth.userId && !!auth.accessToken && !!auth.refreshToken;
});

export const selectName = createSelector(selectAuthState, (auth) => auth.name);
export const selectEmail = createSelector(selectAuthState, (auth) => auth.email);
export const selectRefreshToken = createSelector(selectAuthState, (auth) => auth.refreshToken);
