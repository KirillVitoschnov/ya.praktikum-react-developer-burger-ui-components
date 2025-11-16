import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrdersState } from '../../types/types';

const initialState: OrdersState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders(state, action: PayloadAction<OrdersState>) {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      state.loading = false;
    },
    clearOrders(state) {
      state.orders = [];
      state.total = 0;
      state.totalToday = 0;
      state.loading = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    }
  },
});

export const { setOrders, clearOrders, setLoading } = ordersSlice.actions;
export default ordersSlice.reducer;
