import ordersReducer, { setOrders, clearOrders, setLoading } from './ordersSlice';
import type { OrdersState, Order } from '../../types/types';

const defaultOrder: Order = {
  _id: 'orderid',
  number: 1,
  name: 'Тестовый заказ',
  status: 'done',
  createdAt: '2025-01-01T00:00:00.000Z',
  ingredients: ['ing1', 'ing2'],
};

describe('ordersSlice', () => {
  const initialState: OrdersState = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
  };

  it('должен возвращать начальное состояние', () => {
    expect(ordersReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('должен обрабатывать setOrders', () => {
    const payload: OrdersState = {
      orders: [defaultOrder],
      total: 10,
      totalToday: 5,
      loading: false,
    };
    expect(ordersReducer(initialState, setOrders(payload))).toEqual({ ...initialState, ...payload, loading: false });
  });

  it('должен обрабатывать clearOrders', () => {
    const state: OrdersState = {
      ...initialState,
      orders: [defaultOrder],
      total: 10,
      totalToday: 5,
      loading: true,
    };
    expect(ordersReducer(state, clearOrders())).toEqual(initialState);
  });

  it('должен обрабатывать setLoading', () => {
    expect(ordersReducer(initialState, setLoading(true))).toEqual({ ...initialState, loading: true });
  });
});
import { wsReducer } from './wsReducer';
import { WS_OPEN, WS_CLOSE, WS_ERROR, WS_MESSAGE } from './wsTypes';
import type { WsState, WsErrorAction, WsMessageAction } from '../../types/types';

describe('wsReducer', () => {
  const initialState: WsState = {
    connected: false,
    error: null,
    messages: [],
  };

  it('должен возвращать начальное состояние', () => {
    expect(wsReducer(undefined, { type: '' } as any)).toEqual(initialState);
  });

  it('должен обрабатывать WS_OPEN', () => {
    expect(wsReducer(initialState, { type: WS_OPEN })).toEqual({ ...initialState, connected: true, error: null });
  });

  it('должен обрабатывать WS_CLOSE', () => {
    expect(wsReducer({ ...initialState, connected: true }, { type: WS_CLOSE })).toEqual({ ...initialState, connected: false });
  });

  it('должен обрабатывать WS_ERROR', () => {
    const errorAction: WsErrorAction = { type: WS_ERROR, payload: 'Ошибка' };
    expect(wsReducer(initialState, errorAction)).toEqual({ ...initialState, error: 'Ошибка' });
  });

  it('должен обрабатывать WS_MESSAGE и ограничивать сообщения 50', () => {
    const messageAction: WsMessageAction = { type: WS_MESSAGE, payload: { text: 'msg' } };
    let state = initialState;
    for (let i = 0; i < 55; i++) {
      state = wsReducer(state, { type: WS_MESSAGE, payload: { text: `msg${i}` } } as WsMessageAction);
    }
    expect(state.messages.length).toBe(50);
    expect(state.messages[49]).toEqual({ text: 'msg54' });
  });
});
