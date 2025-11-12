import React from "react";
import { useOrdersWebSocket } from "../../hooks/useOrdersWebSocket";
import { useOrdersWebSocketUrl } from "../../hooks/useOrdersWebSocketUrl";

const FeedSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const wsUrl = useOrdersWebSocketUrl("public");
    useOrdersWebSocket(wsUrl, "public");
    return <>{children}</>;
};

export default FeedSocketProvider;
