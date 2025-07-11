"use client";
import { RequireAuth } from "@/components";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

export default function DashboardPage() {
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <RequireAuth>
            <div className="container mt-5">
                <h1>Welcome to the Admin Dashboard</h1>
                <div className="card mt-4" style={{ maxWidth: 400 }}>
                    <div className="card-body">
                        <h5 className="card-title">{user?.name || "User"}</h5>
                        <p className="card-text">
                            <strong>Email:</strong> {user?.email} <br />
                            <strong>Organization:</strong> {user?.organizationId || "N/A"} <br />
                            <strong>Role:</strong> {user?.role}
                        </p>
                    </div>
                </div>
            </div>
        </RequireAuth>
    );
} 