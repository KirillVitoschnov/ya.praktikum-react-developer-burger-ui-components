import { wsReducer } from './wsReducer';
import { WS_OPEN, WS_CLOSE, WS_ERROR, WS_MESSAGE } from './wsTypes';

describe('wsReducer', () => {
  const initialState = {
    connected: false,
    error: null,
    messages: [],
  };

  it('должен возвращать начальное состояние при неизвестном экшене', () => {
    expect(wsReducer(undefined, { type: 'UNKNOWN' })).toEqual(initialState);
  });

  it('должен обрабатывать WS_OPEN', () => {
    const action = { type: WS_OPEN };
    const state = wsReducer(initialState, action);
    expect(state.connected).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен обрабатывать WS_CLOSE', () => {
    const action = { type: WS_CLOSE };
    const state = wsReducer({ ...initialState, connected: true }, action);
    expect(state.connected).toBe(false);
  });

  it('должен обрабатывать WS_ERROR', () => {
    const errorMsg = 'Ошибка';
    const action = { type: WS_ERROR, payload: errorMsg };
    const state = wsReducer(initialState, action);
    expect(state.error).toBe(errorMsg);
  });

  it('должен обрабатывать WS_MESSAGE', () => {
    const message = { text: 'Новое сообщение' };
    const action = { type: WS_MESSAGE, payload: message };
    const state = wsReducer(initialState, action);
    expect(state.messages).toContain(message);
  });
});
