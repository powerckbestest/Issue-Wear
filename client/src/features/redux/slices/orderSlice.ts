import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { OrderType } from '../../../types/orderType';

type InitialState = OrderType[];

const initialState: InitialState = [];

export const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {
    getOrders: (state, action: PayloadAction<OrderType[]>) => {
      state = action.payload;
    },
    addOrder: (state, action: PayloadAction<OrderType>) => {
      state.push(action.payload);
    },
  },
});

export default orderSlice.reducer;

export const { getOrders, addOrder } = orderSlice.actions;
