import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrdersState, UserOrdersState } from '../../types/types';

const initialState: UserOrdersState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
};

export const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {
    setUserOrders(state, action: PayloadAction<OrdersState>) {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    setUserOrdersFull(state, action: PayloadAction<UserOrdersState>) {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      state.loading = action.payload.loading;
    },
    setUserOrdersLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    }
  },
});

export const { setUserOrders, setUserOrdersFull, setUserOrdersLoading } = userOrdersSlice.actions;
export default userOrdersSlice.reducer;
