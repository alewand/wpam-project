import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import persistReducer from "redux-persist/es/persistReducer";
import { UserResponse } from "./types";

export interface AuthState {
    userId?: string;
    name?: string;
    email?: string;
    role?: string;
    accessToken?: string;
    refreshToken?: string;
}

const initialState: AuthState = {
    userId: undefined,
    name: undefined,
    email: undefined,
    role: undefined,
    accessToken: undefined,
    refreshToken: undefined,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserCredentials(state, action: PayloadAction<UserResponse>) {
            const { user, accessToken, refreshToken } = action.payload;
            state.userId = user.userId;
            state.name = user.name;
            state.email = user.email;
            state.role = user.role;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
        },
        updateTokens(state, action: { payload: { accessToken?: string; refreshToken?: string } }) {
            const { accessToken, refreshToken } = action.payload;
            if (accessToken) state.accessToken = accessToken;
            if (refreshToken) state.refreshToken = refreshToken;
        },
        clearUserCredentials() {
            return initialState;
        },
    },
});

const authPersistConfig = {
    key: "auth",
    storage: AsyncStorage,
    whitelist: ["accessToken", "refreshToken", "userId", "name", "email", "role"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authSlice.reducer);

export default persistedAuthReducer;
export const { setUserCredentials, updateTokens, clearUserCredentials } = authSlice.actions;