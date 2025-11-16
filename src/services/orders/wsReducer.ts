import {
  WS_OPEN,
  WS_MESSAGE,
  WS_ERROR,
  WS_CLOSE,
  WsActions
} from './wsTypes';
import type { WsState, WsErrorAction, WsMessageAction } from '../../types/types';

const initialState: WsState = {
  connected: false,
  error: null,
  messages: [],
};

export const wsReducer = (state = initialState, action: WsActions): WsState => {
  switch (action.type) {
    case WS_OPEN:
      return { ...state, connected: true, error: null };
    case WS_CLOSE:
      return { ...state, connected: false };
    case WS_ERROR:
      return { ...state, error: (action as WsErrorAction).payload };
    case WS_MESSAGE:
      const newMessage = (action as WsMessageAction).payload;
      return {
        ...state,
        messages: [...state.messages.slice(-49), newMessage],
      };
    default:
      return state;
  }
};
