import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { OrderFromDb, OrderType } from '../../../types/orderType';

type InitialState = OrderType[];

const initialState: InitialState = [];

export const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {
    getOrders: (state, action: PayloadAction<OrderFromDb[]>) => (state = action.payload),
    addOrder: (state, action: PayloadAction<OrderFromDb>) => {
      state.push(action.payload);
    },
    changeOrderStatus: (state, action: PayloadAction<OrderFromDb>) =>
      state.map((order) => (order.id === action.payload.id ? action.payload : order)),
    cancelOrder: (state, action: PayloadAction<number>) => state.filter((el) => el.id !== action.payload)
  },
});

export default orderSlice.reducer;

export const { getOrders, addOrder, changeOrderStatus, cancelOrder } = orderSlice.actions;
