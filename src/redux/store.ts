import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "../features/auth/authSlice";
// import organizationReducer from "../features/organization/organizationSlice";
// import settingsReducer from "../features/settings/settingsSlice";
// import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
    reducer: {
        // auth: authReducer,
        // organization: organizationReducer,
        // settings: settingsReducer,
        // [apiSlice.reducerPath]: apiSlice.reducer,
    },
    // middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>; 