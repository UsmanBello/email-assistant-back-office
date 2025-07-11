"use client";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { useEffect } from "react";
import { loadFromStorage } from "@/features/authSlice";

export function Providers({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Load auth data from localStorage after component mounts
        store.dispatch(loadFromStorage());
    }, []);

    return <Provider store={store}>{children}</Provider>;
} 