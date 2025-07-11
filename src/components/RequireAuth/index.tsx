"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "../../redux/store";

interface RequireAuthProps {
    children: React.ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
    const router = useRouter();
    const { token, isLoadingFromStorage } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        // Only redirect if we're not loading from storage and there's no token
        if (!isLoadingFromStorage && !token) {
            console.log("[RequireAuth] No token found, redirecting to login");
            router.replace("/login");
        }
    }, [token, isLoadingFromStorage, router]);

    // Show loading while checking auth from localStorage
    if (isLoadingFromStorage) {
        console.log("[RequireAuth] Loading auth from storage...");
        return <div>Loading...</div>;
    }

    // Don't render children if no token (will redirect)
    if (!token) {
        return null;
    }

    return <>{children}</>;
} 