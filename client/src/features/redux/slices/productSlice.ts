import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ProductType } from "../../../types/productType";

const initialState: ProductType[] = []


export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        getProducts: (state, action: PayloadAction<ProductType[]>) => [...action.payload],
        setProduct: (state, action: PayloadAction<ProductType>) => [...state, action.payload],
        deleteProduct: (state, action: PayloadAction<number>) => state.filter((el) => el.id !== action.payload),
        editProduct: (state, action: PayloadAction<ProductType>) => state.map((el) => el.id !== action.payload.id? el: action.payload)


    }
})


export default productSlice.reducer
export const {getProducts, setProduct, deleteProduct, editProduct} = productSlice.actions