import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import { socketMiddleware } from "./socketMiddleware";
import { WS_CONNECT, WS_DISCONNECT, WS_OPEN, WS_CLOSE, WS_ERROR, WS_MESSAGE } from "./orders/wsTypes";
import { getOrdersWebSocketUrl } from "../hooks/useOrdersWebSocketUrl";

const wsUrl = getOrdersWebSocketUrl('public');
if (!wsUrl) {
    throw new Error("WebSocket URL is not defined. Please check the configuration.");
}

const wsActions = {
    wsConnect: WS_CONNECT,
    wsDisconnect: WS_DISCONNECT,
    wsConnecting: "WS_CONNECTING",
    onOpen: WS_OPEN,
    onClose: WS_CLOSE,
    onError: WS_ERROR,
    onMessage: WS_MESSAGE,
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware(wsUrl, wsActions)),
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootStore> = useSelector;
