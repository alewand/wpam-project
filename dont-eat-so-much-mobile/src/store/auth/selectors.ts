import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../store";

const selectAuthState = createSelector(
    (state: RootState) => state.auth,
    (auth) => auth
);

export const selectIsAuthenticated = createSelector(
    selectAuthState,
    (auth) => {
        return !!auth.userId && !!auth.accessToken && !!auth.refreshToken;
    }
);