import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Order {
  ingredients: string[];
  _id: string;
  status: 'created' | 'pending' | 'done';
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
}

export interface OrdersState {
  orders: Order[];
  total: number;
  totalToday: number;
}

const initialState: OrdersState = {
  orders: [],
  total: 0,
  totalToday: 0,
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
  },
});

export const { setUserOrders } = userOrdersSlice.actions;
export default userOrdersSlice.reducer;
