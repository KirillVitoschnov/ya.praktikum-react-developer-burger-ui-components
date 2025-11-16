import { API_BASE_URL } from "../constants/api";

export function getOrdersWebSocketUrl(type: "public" | "user" = "user", accessToken?: string | null) {
    console.log("getOrdersWebSocketUrl called with type:", type, "and accessToken:", accessToken);
    const baseUrl = API_BASE_URL
        .replace(/^http:\/\//, 'ws://')
        .replace(/^https:\/\//, 'wss://')
        .replace(/\/api\/?$/, '/');

    if (type === "public") {
        return `${baseUrl}orders/all`;
    }
    if (!accessToken) {
        console.warn("Access token is missing for user WebSocket URL.");
        return null;
    }
    return `${baseUrl}orders?token=${accessToken}`;
}
