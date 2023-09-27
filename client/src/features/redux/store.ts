import { combineReducers, configureStore } from '@reduxjs/toolkit';

import productReducer from './slices/productSlice';

import userReducer from './slices/userSlice';

import orderReducer from './slices/orderSlice'

const rootReducer = combineReducers({
  productsData: productReducer
})

export const store = configureStore({
  reducer: {
    product: rootReducer,
    user: userReducer,
    order: orderReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
