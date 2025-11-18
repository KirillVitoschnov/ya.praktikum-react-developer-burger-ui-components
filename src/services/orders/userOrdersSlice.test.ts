import userOrdersReducer, { setUserOrders, setUserOrdersFull, setUserOrdersLoading } from './userOrdersSlice';
import type { UserOrdersState, OrdersState, Order } from '../../types/types';

const defaultOrder: Order = {
  _id: 'orderid',
  number: 1,
  name: 'Тестовый заказ',
  status: 'done',
  createdAt: '2025-01-01T00:00:00.000Z',
  ingredients: ['ing1', 'ing2'],
};

describe('userOrdersSlice', () => {
  const initialState: UserOrdersState = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
  };

  it('должен возвращать начальное состояние', () => {
    expect(userOrdersReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('должен обрабатывать setUserOrders', () => {
    const payload: OrdersState = {
      orders: [defaultOrder],
      total: 10,
      totalToday: 5,
      loading: false,
    };
    expect(userOrdersReducer(initialState, setUserOrders(payload))).toEqual({ ...initialState, ...payload });
  });

  it('должен обрабатывать setUserOrdersFull', () => {
    const payload: UserOrdersState = {
      orders: [defaultOrder],
      total: 20,
      totalToday: 10,
      loading: true,
    };
    expect(userOrdersReducer(initialState, setUserOrdersFull(payload))).toEqual(payload);
  });

  it('должен обрабатывать setUserOrdersLoading', () => {
    expect(userOrdersReducer(initialState, setUserOrdersLoading(true))).toEqual({ ...initialState, loading: true });
  });
});
