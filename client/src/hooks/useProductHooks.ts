import type React from 'react';
import { useAppDispatch } from './reduxHooks';
import {
  addProductCartService,
  deleteProductCartService,
  deleteProductService,
  editProductService,
  getCardProductService,
  getProductInCartService,
  getProductService,
  postProductService,
} from '../services/productService';
import {
  addToCart,
  deleteFromCart,
  deleteProduct,
  editProduct,
  getCardProduct,
  getCartProducts,
  getProducts,
  setProduct,
} from '../features/redux/slices/productSlice';
import type { ProductFormType } from '../types/productType';

type ProductFormData = {
  name: string;
  desc: string;
  price: string;
};

export default function useProductHooks(): {
  getProductsHandler: () => void;
  addProductHandler: (e: React.FormEvent<HTMLFormElement & ProductFormType>, images) => void;
  deleteProductHandler: (e: React.MouseEvent<HTMLElement>, id: number) => void;
  editProductHandler: (id: number, data: ProductFormData) => void;
  getProductsCartHandler: () => void;
  addProductCartHandler: (e: React.MouseEvent<HTMLElement>, id: number) => void;
  deleteProductCartHandler: (e: React.MouseEvent<HTMLElement>, id: number) => void;
  getCartProductHandler: (id: number) => void;
} {
  const dispatch = useAppDispatch();

  const getProductsHandler = (): void => {
    getProductService()
      .then((data) => dispatch(getProducts(data)))
      .catch((err) => Promise.reject(err));
  };

  const addProductHandler = (
    e: React.FormEvent<HTMLFormElement & ProductFormType>,
    images, wardrobe
  ): void => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', e.currentTarget.title.value);
    formData.append('price', e.currentTarget.price.value);
    formData.append('colorId', e.currentTarget.colorId.value);
    formData.append('description', e.currentTarget.description.value);
    formData.append('categoryId', e.currentTarget.categoryId.value);
    formData.append('size', e.currentTarget.size.value);
    for (const file of images) {
      formData.append('images', file);
    }

    for (const file of wardrobe) {
      formData.append('wardrobe', file)
    }

    postProductService(formData)
      .then((data) => dispatch(setProduct(data)))
      .catch((err) => Promise.reject(err));
  };

  const deleteProductHandler = (e: React.MouseEvent<HTMLElement>, id: number): void => {
    e.preventDefault();
    deleteProductService(id)
      .then((data) => dispatch(deleteProduct(id)))
      .catch((err) => Promise.reject(err));
  };

  const editProductHandler = (id: number, data: ProductFormData): void => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('desc', data.desc);
    formData.append('price', data.price);
    editProductService(id, formData)
      .then((res) => dispatch(editProduct(res)))
      .catch((err) => Promise.reject(err));
  };

  const getProductsCartHandler = (): void => {
    getProductInCartService()
      .then((data) => dispatch(getCartProducts(data)))
      .catch((err) => Promise.reject(err));
  };

  const addProductCartHandler = (e: React.MouseEvent<HTMLElement>, id:number) : void => {
    e.preventDefault()
    addProductCartService(id)
      .then((addProduct) => dispatch(addToCart(addProduct)))
      .catch((err) => console.error('Ошибка при добавлении в корзину', err));
  };

  const deleteProductCartHandler = (e: React.MouseEvent<HTMLElement>, id: number): void => {
    e.preventDefault();
    deleteProductCartService(id)
      .then(() => dispatch(deleteFromCart(id)))
      .catch((err) => Promise.reject(err));
  };

  // НЕ ЗАБЫТЬ ПРАВИЛЬНО ДОПИСАТЬ В СЛАЙСЕ getCardProduct
  const getCartProductHandler = (id: number): void => {
    getCardProductService(id)
      .then((data) => dispatch(getCardProduct(data)))
      .catch((err) => Promise.reject(err));
  };

  return {
    getProductsHandler,
    addProductHandler,
    deleteProductHandler,
    editProductHandler,
    getProductsCartHandler,
    addProductCartHandler,
    deleteProductCartHandler,
    getCartProductHandler,
  };
}
