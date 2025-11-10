import { useSelector } from "react-redux";
import { useMemo } from "react";
import { API_BASE_URL } from "../constants/api";

export function useOrdersWebSocketUrl() {
    const accessToken = useSelector((state: any) => state.auth?.accessToken) || localStorage.getItem("accessToken");

    const wsUrl = useMemo(() => {
        if (!accessToken) return null;
        const baseUrl = API_BASE_URL
            .replace(/^http:\/\//, 'ws://')
            .replace(/^https:\/\//, 'wss://')
            .replace(/\/api\/?$/, '/');
        return `${baseUrl}orders?token=${accessToken}`;
    }, [accessToken]);

    return wsUrl;
}
