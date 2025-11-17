import allOrdersReducer, { setOrders } from './allOrdersSlice';
import type { OrdersState, Order } from '../../types/types';

const defaultOrder: Order = {
  _id: 'orderid',
  number: 1,
  name: 'Тестовый заказ',
  status: 'done',
  createdAt: '2025-01-01T00:00:00.000Z',
  ingredients: ['ing1', 'ing2'],
};

describe('allOrdersSlice', () => {
  const initialState: OrdersState = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
  };

  it('должен возвращать начальное состояние', () => {
    expect(allOrdersReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('должен обрабатывать setOrders', () => {
    const payload: OrdersState = {
      orders: [defaultOrder],
      total: 10,
      totalToday: 5,
      loading: false,
    };
    expect(allOrdersReducer(initialState, setOrders(payload))).toEqual({ ...initialState, ...payload });
  });
});
