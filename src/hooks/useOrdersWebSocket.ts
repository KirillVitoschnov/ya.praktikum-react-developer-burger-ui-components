import React from "react";
import { useAppDispatch } from "../services/store";
import { setOrders } from '../services/orders/ordersSlice';
import { setUserOrders } from '../services/orders/userOrdersSlice';
import { useAuthRefresh } from "./useAuthRefresh";

interface UseOrdersWebSocketResult {
    isConnected: boolean;
    sendMessage: (message: any) => void;
}

export function useOrdersWebSocket(initialUrl: string | null, sliceType: "public" | "user" = "public"): UseOrdersWebSocketResult {
    const [isConnected, setIsConnected] = React.useState(false);
    const [wsUrl, setWsUrl] = React.useState(initialUrl);
    const wsRef = React.useRef<WebSocket | null>(null);
    const reconnectTimeoutRef = React.useRef<NodeJS.Timeout>();
    const reconnectAttemptsRef = React.useRef(0);
    const maxReconnectAttempts = 5;
    const reconnectDelay = 3000;
    const dispatch = useAppDispatch();
    const { refresh } = useAuthRefresh();

    const connect = React.useCallback(async () => {
        if (!wsUrl) return;
        if (wsRef.current) wsRef.current.close();
        try {
            const ws = new WebSocket(wsUrl);
            wsRef.current = ws;
            ws.onopen = () => {
                setIsConnected(true);
                reconnectAttemptsRef.current = 0;
            };
            ws.onmessage = async (event) => {
                try {
                    const data = JSON.parse(event.data);
                    if (data.message && (data.message.includes('Invalid or missing token') || data.message.includes('jwt expired'))) {
                        setIsConnected(false);
                        const newToken = await refresh();
                        if (newToken) {
                            let newUrl = wsUrl;
                            if (wsUrl && wsUrl.includes('token=')) {
                                newUrl = wsUrl.replace(/token=[^&]+/, `token=${newToken}`);
                            }
                            reconnectAttemptsRef.current = 0;
                            wsRef.current?.close();
                            setWsUrl(newUrl);
                        }
                        return;
                    }
                    if (data.orders && typeof data.total === 'number' && typeof data.totalToday === 'number') {
                        if (sliceType === "public") {
                            dispatch(setOrders({
                                orders: data.orders,
                                total: data.total,
                                totalToday: data.totalToday
                            }));
                        } else {
                            dispatch(setUserOrders({
                                orders: data.orders,
                                total: data.total,
                                totalToday: data.totalToday
                            }));
                        }
                    }
                } catch {}
            };
            ws.onerror = () => {
                setIsConnected(false);
            };
            ws.onclose = async (event) => {
                setIsConnected(false);
                wsRef.current = null;
                if (event.code === 4001 || event.code === 4003) {
                    const newToken = await refresh();
                    if (newToken) {
                        let newUrl = wsUrl;
                        if (wsUrl && wsUrl.includes('token=')) {
                            newUrl = wsUrl.replace(/token=[^&]+/, `token=${newToken}`);
                        }
                        reconnectAttemptsRef.current = 0;
                        setWsUrl(newUrl);
                        return;
                    }
                }
                if (reconnectAttemptsRef.current < maxReconnectAttempts) {
                    reconnectAttemptsRef.current++;
                    reconnectTimeoutRef.current = setTimeout(connect, reconnectDelay);
                }
            };
        } catch {}
    }, [wsUrl, sliceType, dispatch, refresh]);

    React.useEffect(() => {
        connect();
        return () => {
            if (wsRef.current) wsRef.current.close();
            if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
        };
    }, [connect]);

    React.useEffect(() => {
        if (wsUrl !== initialUrl) {
            connect();
        }
    }, [wsUrl]);

    const sendMessage = React.useCallback((message: any) => {
        if (wsRef.current && isConnected) {
            wsRef.current.send(JSON.stringify(message));
        }
    }, [isConnected]);

    return { isConnected, sendMessage };
}
