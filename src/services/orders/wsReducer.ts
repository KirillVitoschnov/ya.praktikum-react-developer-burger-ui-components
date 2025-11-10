import {
  WS_OPEN,
  WS_MESSAGE,
  WS_ERROR,
  WS_CLOSE,
  WsActions
} from './wsTypes';

export interface WsState {
  connected: boolean;
  error: string | null;
  messages: any[];
}

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
      return { ...state, error: action.payload };
    case WS_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] };
    default:
      return state;
  }
};

