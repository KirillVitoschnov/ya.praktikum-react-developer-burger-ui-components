import { useAppSelector } from "../services/store";
import { useMemo } from "react";
import { API_BASE_URL } from "../constants/api";

export function useOrdersWebSocketUrl(type: "public" | "user" = "user") {
    const accessToken = useAppSelector((state: any) => state.auth?.accessToken) || localStorage.getItem("accessToken");

    const wsUrl = useMemo(() => {
        const baseUrl = API_BASE_URL
            .replace(/^http:\/\//, 'ws://')
            .replace(/^https:\/\//, 'wss://')
            .replace(/\/api\/?$/, '/');
        if (type === "public") {
            return `${baseUrl}orders/all`;
        }
        if (!accessToken) return null;
        return `${baseUrl}orders?token=${accessToken}`;
    }, [type, accessToken]);

    return wsUrl;
}
