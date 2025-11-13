import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrdersState } from '../../types/types';

const initialState: OrdersState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
};

export const allOrdersSlice = createSlice({
  name: 'allOrders',
  initialState,
  reducers: {
    setOrders(state, action: PayloadAction<OrdersState>) {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
  },
});

export const { setOrders } = allOrdersSlice.actions;
export default allOrdersSlice.reducer;
