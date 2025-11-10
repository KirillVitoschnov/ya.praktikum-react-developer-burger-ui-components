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

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders(state, action: PayloadAction<OrdersState>) {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    clearOrders(state) {
      state.orders = [];
      state.total = 0;
      state.totalToday = 0;
    }
  },
});

export const { setOrders} = ordersSlice.actions;
export default ordersSlice.reducer;
