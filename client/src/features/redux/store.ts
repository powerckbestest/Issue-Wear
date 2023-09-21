import { combineReducers, configureStore } from '@reduxjs/toolkit';

import productReducer from './slices/productSlice';

import userReducer from './slices/userSlice';

const rootReducer = combineReducers({
  productsData: productReducer
})

export const store = configureStore({
  reducer: {
    product: rootReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
