export const WS_CONNECT = 'WS_CONNECT';
export const WS_OPEN = 'WS_OPEN';
export const WS_MESSAGE = 'WS_MESSAGE';
export const WS_ERROR = 'WS_ERROR';
export const WS_CLOSE = 'WS_CLOSE';
export const WS_SEND = 'WS_SEND';
export const WS_DISCONNECT = 'WS_DISCONNECT';

export interface WsConnectAction {
  type: typeof WS_CONNECT;
  token?: string;
}
export interface WsOpenAction {
  type: typeof WS_OPEN;
}
export interface WsMessageAction {
  type: typeof WS_MESSAGE;
  payload: any;
}
export interface WsErrorAction {
  type: typeof WS_ERROR;
  payload: any;
}
export interface WsCloseAction {
  type: typeof WS_CLOSE;
}
export interface WsSendAction {
  type: typeof WS_SEND;
  payload: any;
}
export interface WsDisconnectAction {
  type: typeof WS_DISCONNECT;
}

export type WsActions =
  | WsConnectAction
  | WsOpenAction
  | WsMessageAction
  | WsErrorAction
  | WsCloseAction
  | WsSendAction
  | WsDisconnectAction;

