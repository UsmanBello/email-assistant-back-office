import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponse, AuthStateType, UserType } from "@/types/authTypes";

const initialState: AuthStateType = {
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    isAuthenticating: false,
    isLoadingFromStorage: true, // Add loading state
    error: null,
};

// Load auth data from localStorage on app startup
const loadAuthFromStorage = (): Partial<AuthStateType> => {
    if (typeof window === 'undefined') return {}; // Server-side rendering

    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    const userStr = localStorage.getItem("user");

    if (token && userStr) {
        try {
            const user = JSON.parse(userStr);
            console.log("[Auth] Loaded from localStorage:", { token, refreshToken, user });
            return {
                user,
                token,
                refreshToken,
                isAuthenticated: true,
            };
        } catch (error) {
            console.error("[Auth] Error parsing user from localStorage:", error);
            // Clear invalid data
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");
        }
    }

    return {};
};

const setAuthDataInStorage = (authData: AuthResponse) => {
    if (!authData.user || !authData.token || !authData.refreshToken) return;
    localStorage.setItem("token", authData.token);
    localStorage.setItem("refreshToken", authData.refreshToken);
    localStorage.setItem("user", JSON.stringify(authData.user));
    console.log("[Auth] Saved to localStorage:", {
        token: authData.token,
        refreshToken: authData.refreshToken,
        user: authData.user,
    });
};

const removeAuthDataFromStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    console.log("[Auth] Removed user, token, and refreshToken from localStorage");
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
            state.isLoadingFromStorage = false; // Mark as loaded
            setAuthDataInStorage({ user, token, refreshToken });
            console.log("[Auth] Saved to Redux state:", {
                user,
                token,
                refreshToken,
            });
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            state.isLoadingFromStorage = false; // Mark as loaded
            removeAuthDataFromStorage();
            console.log("[Auth] Cleared Redux state");
        },
        loadFromStorage: (state) => {
            const storedAuth = loadAuthFromStorage();
            if (storedAuth.user && storedAuth.token) {
                state.user = storedAuth.user;
                state.token = storedAuth.token;
                state.refreshToken = storedAuth.refreshToken;
                state.isAuthenticated = true;
            }
            state.isLoadingFromStorage = false; // Mark as loaded
            console.log("[Auth] Finished loading from storage, isAuthenticated:", state.isAuthenticated);
        },
        setIsAuthenticating: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticating = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
});

export const { setCredentials, logout, loadFromStorage, setIsAuthenticating, setError } = authSlice.actions;
export default authSlice.reducer; 