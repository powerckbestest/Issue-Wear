import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ProductType } from '../../../types/productType';

type InitialState = {
  products: ProductType[];
  cartProducts: ProductType[];
};

const initialState: InitialState = {
  products: [],
  cartProducts: [],
};

export const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {
    getProducts: (state, action: PayloadAction<ProductType[]>) => {
      state.products = action.payload;
    },
    setProduct: (state, action: PayloadAction<ProductType>) => {
      state.products.push(action.payload);
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products.filter((el) => el.id !== action.payload);
    },
    editProduct: (state, action: PayloadAction<ProductType>) => {
      state.products.map((el) => (el.id !== action.payload.id ? el : action.payload));
    },
    getCartProducts: (state, action: PayloadAction<ProductType[]>) => {
      state.cartProducts = action.payload
    },
    addToCart: (state, action: PayloadAction<ProductType>) => {
      const check = state.cartProducts.find((el) => el.id === action.payload.id);
      if (!check) {
        state.cartProducts.push(action.payload);
      }
    },
    deleteFromCart: (state, action: PayloadAction<number>) => {
      state.cartProducts.filter((el) => el.id !== action.payload);
    },
  },
});

export default productSlice.reducer;
export const { getProducts, setProduct, deleteProduct, editProduct, addToCart, deleteFromCart, getCartProducts } =
  productSlice.actions;
