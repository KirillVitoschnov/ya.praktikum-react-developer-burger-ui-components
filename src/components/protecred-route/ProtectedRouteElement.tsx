import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../../services/store";
import { selectIsAuthenticated } from "../../services/auth/authSlice";


export default function ProtectedRouteElement() {
    const isAuthed = useAppSelector(selectIsAuthenticated);
    const location = useLocation();

    if (!isAuthed) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return <Outlet />;
}
