import type {
  WsConnectAction,
  WsOpenAction,
  WsMessageAction,
  WsErrorAction,
  WsCloseAction,
  WsSendAction,
  WsDisconnectAction,
  WsActions
} from '../../types/types';

export const WS_CONNECT = 'WS_CONNECT';
export const WS_OPEN = 'WS_OPEN';
export const WS_MESSAGE = 'WS_MESSAGE';
export const WS_ERROR = 'WS_ERROR';
export const WS_CLOSE = 'WS_CLOSE';
export const WS_SEND = 'WS_SEND';
export const WS_DISCONNECT = 'WS_DISCONNECT';

export type {
  WsConnectAction,
  WsOpenAction,
  WsMessageAction,
  WsErrorAction,
  WsCloseAction,
  WsSendAction,
  WsDisconnectAction,
  WsActions
};
