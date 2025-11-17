import { socketMiddleware, TWsActions } from './socketMiddleware';

describe('socketMiddleware', () => {
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

  it('должен возвращать middleware функцию', () => {
    const middleware = socketMiddleware('ws://localhost', wsActions);
    expect(typeof middleware).toBe('function');
  });

  it('middleware должен корректно обрабатывать экшены', () => {
    const store = { dispatch: jest.fn() };
    const next = jest.fn();
    const action = { type: wsActions.wsConnect, payload: 'ws://localhost' };
    const mw = socketMiddleware('ws://localhost', wsActions)(store as any)(next);
    mw(action);
    expect(store.dispatch).toHaveBeenCalledWith({ type: wsActions.wsConnecting });
  });
});
import * as API from './API';

jest.mock('../utils/request', () => ({
  request: jest.fn((url: string, options?: any) => {
    if (url.includes('ingredients')) {
      return Promise.resolve({ data: [{ id: 1, name: 'Булка' }] });
    }
    if (url.includes('orders') && options?.method === 'POST') {
      return Promise.resolve({ order: { number: 123 }, name: 'Тест' });
    }
    return Promise.resolve({});
  }),
  getAccessTokenFromLocalStorage: jest.fn(() => 'token')
}));
