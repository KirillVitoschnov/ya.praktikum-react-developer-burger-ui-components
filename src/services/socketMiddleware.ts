import { Middleware, AnyAction } from 'redux';

export type TWsActions = {
  wsConnect: string;
  wsDisconnect: string;
  wsConnecting: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
  wsSendMessage?: string;
};

export const socketMiddleware = (wsUrl: string, wsActions: TWsActions): Middleware => {
  let socket: WebSocket | null = null;

  const middleware: Middleware = (store) => (next) => (action) => {
    const act = action as AnyAction;
    switch (act.type) {
      case wsActions.wsConnect: {
        socket = new WebSocket(wsUrl + (act.token ? `?token=${act.token}` : ''));
        store.dispatch({ type: wsActions.wsConnecting });
        socket.onopen = () => store.dispatch({ type: wsActions.onOpen });
        socket.onmessage = (event) => store.dispatch({ type: wsActions.onMessage, payload: JSON.parse(event.data) });
        socket.onerror = (event) => store.dispatch({ type: wsActions.onError, payload: { type: event.type } });
        socket.onclose = (event) => store.dispatch({ type: wsActions.onClose, payload: { code: event.code, reason: event.reason, wasClean: event.wasClean } });
        break;
      }
      case wsActions.wsSendMessage: {
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify(act.payload));
        }
        break;
      }
      case wsActions.wsDisconnect: {
        if (socket) {
          socket.close();
        }
        socket = null;
        break;
      }
      default:
        break;
    }
    return next(action);
  };

  return middleware;
};
