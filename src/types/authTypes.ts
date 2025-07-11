export interface UserType {
    name: string;
    id: string;
    email: string;
    role: "admin" | "user";
    organizationId: string;
}

export interface AuthResponse {
    user: UserType | null;
    token: string | null;
    refreshToken?: string | null;
}

export interface AuthStateType {
    user: UserType | null;
    token: string | null;
    refreshToken?: string | null;
    isAuthenticated: boolean;
    isAuthenticating: boolean;
    isLoadingFromStorage: boolean;
    error: string | null;
} 