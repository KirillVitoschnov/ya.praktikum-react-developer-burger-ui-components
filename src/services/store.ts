import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import { socketMiddleware, TWsActions } from "./socketMiddleware";
import { API_BASE_URL } from "../constants/api";

const wsActions: TWsActions = {
    wsConnect: 'WS_CONNECT',
    wsDisconnect: 'WS_DISCONNECT',
    wsConnecting: 'WS_CONNECTING',
    onOpen: 'WS_OPEN',
    onClose: 'WS_CLOSE',
    onError: 'WS_ERROR',
    onMessage: 'WS_MESSAGE',
    wsSendMessage: 'WS_SEND',
};

const accessToken = localStorage.getItem("accessToken");
const wsUrl = accessToken
    ? API_BASE_URL.replace(/^http:\/\//, 'ws://')
        .replace(/^https:\/\//, 'wss://')
        .replace(/\/api\/?$/, '/') + `orders?token=${accessToken}`
    : null;

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        const middlewares = getDefaultMiddleware({
            serializableCheck: false,
        });
        return wsUrl ? middlewares.concat(socketMiddleware(wsUrl, wsActions)) : middlewares;
    },
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootStore> = useSelector;
