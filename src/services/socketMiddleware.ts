import { Middleware, AnyAction } from 'redux';

export const socketMiddleware = (wsUrl: string): Middleware => {
  let socket: WebSocket | null = null;

  const middleware: Middleware = (store) => (next) => (action) => {
    const act = action as AnyAction;
    switch (act.type) {
      case 'WS_CONNECT': {
        socket = new WebSocket(wsUrl + (act.token ? `?token=${act.token}` : ''));
        socket.onopen = () => store.dispatch({ type: 'WS_OPEN' });
        socket.onmessage = (event) => store.dispatch({ type: 'WS_MESSAGE', payload: JSON.parse(event.data) });
        socket.onerror = (event) => store.dispatch({ type: 'WS_ERROR', payload: { type: event.type } });
        socket.onclose = (event) => store.dispatch({ type: 'WS_CLOSE', payload: { code: event.code, reason: event.reason, wasClean: event.wasClean } });
        break;
      }
      case 'WS_SEND': {
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify(act.payload));
        }
        break;
      }
      case 'WS_DISCONNECT': {
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
