import React from "react";
import { useOrdersWebSocket } from "../../../hooks/useOrdersWebSocket";
import { useOrdersWebSocketUrl } from "../../../hooks/useOrdersWebSocketUrl";

const ProfileOrdersSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const wsUrl = useOrdersWebSocketUrl();
    useOrdersWebSocket(wsUrl, "user");
    return <>{children}</>;
};

export default ProfileOrdersSocketProvider;
