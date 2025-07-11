"use client";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useLoginWithGoogleMutation } from "@/lib/redux/features/authApiSlice";
import { setCredentials, setError } from "@/lib/redux/features/authSlice";
import { useRouter } from "next/navigation";
import Alert from "react-bootstrap/Alert";

declare global {
    interface Window {
        google?: any;
    }
}

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

export default function LoginPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [loginWithGoogle, { isLoading, error }] = useLoginWithGoogleMutation();
    const googleButtonRef = useRef<HTMLDivElement>(null);

    // Add Google Identity Services script if not present
    useEffect(() => {
        if (document.getElementById("google-client-script")) {
            console.log("Google script already present");
            return;
        }
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.id = "google-client-script";
        script.onload = () => {
            console.log("Google Identity Services script loaded");
        };
        script.onerror = () => {
            console.error("Failed to load Google Identity Services script");
        };
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // Try to render the Google button when script is loaded
    useEffect(() => {
        const interval = setInterval(() => {
            if (window.google && window.google.accounts && window.google.accounts.id && googleButtonRef.current) {
                console.log("Google API available, rendering button");
                window.google.accounts.id.initialize({
                    client_id: GOOGLE_CLIENT_ID,
                    callback: async (response: any) => {
                        try {
                            const result = await loginWithGoogle({ credential: response.credential }).unwrap();
                            dispatch(setCredentials(result));
                            router.push("/dashboard");
                        } catch (err: any) {
                            dispatch(setError("Login failed. Please try again."));
                        }
                    },
                    ux_mode: "popup",
                    scope: "openid email profile",
                });
                window.google.accounts.id.renderButton(googleButtonRef.current, {
                    theme: "outline",
                    size: "large",
                    width: 300,
                });
                clearInterval(interval);
            } else {
                console.log("Waiting for Google API to be available...");
            }
        }, 300);
        return () => clearInterval(interval);
    }, [loginWithGoogle, dispatch, router]);

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
            <div className="card p-4 shadow" style={{ maxWidth: 400, width: "100%" }}>
                <h2 className="mb-4 text-center">Sign in to Email Assistant</h2>
                <div ref={googleButtonRef} className="mb-3" />
                {error && <Alert variant="danger">Login failed. Please try again.</Alert>}
                <div className="text-center mt-3">
                    <span>Don't have an account? </span>
                    <a href="/register">Register</a>
                </div>
            </div>
        </div>
    );
}