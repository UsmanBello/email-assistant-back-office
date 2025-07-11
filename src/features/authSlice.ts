import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponse, AuthStateType, UserType } from "@/types/authTypes";

const initialState: AuthStateType = {
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    isAuthenticating: false,
    error: null,
};

const setAuthDataInStorage = (authData: AuthResponse) => {
    if (!authData.user || !authData.token || !authData.refreshToken) return;
    localStorage.setItem("token", authData.token);
    localStorage.setItem("refreshToken", authData.refreshToken);
    localStorage.setItem("user", JSON.stringify(authData.user));
};

const removeAuthDataFromStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (
            state,
            { payload: { user, token, refreshToken } }: PayloadAction<AuthResponse>
        ) => {
            state.user = user;
            state.token = token;
            state.refreshToken = refreshToken || null;
            state.isAuthenticated = true;
            state.error = null;
            setAuthDataInStorage({ user, token, refreshToken });
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            removeAuthDataFromStorage();
        },
        setIsAuthenticating: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticating = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
});

export const { setCredentials, logout, setIsAuthenticating, setError } = authSlice.actions;
export default authSlice.reducer; 