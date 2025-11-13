import { API_BASE_URL } from "../constants/api";

export function getOrdersWebSocketUrl(type: "public" | "user" = "user", accessToken?: string | null) {
    const baseUrl = API_BASE_URL
        .replace(/^http:\/\//, 'ws://')
        .replace(/^https:\/\//, 'wss://')
        .replace(/\/api\/?$/, '/');

    if (type === "public") {
        return `${baseUrl}orders/all`;
    }
    if (!accessToken) return null;
    return `${baseUrl}orders?token=${accessToken}`;
}
