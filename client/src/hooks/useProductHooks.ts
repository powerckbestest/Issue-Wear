import type React from 'react'
import { useAppDispatch } from './reduxHooks';
import { addProductCartService, deleteProductService, editProductService, getProductService, postProductService } from '../services/productService';
import { addToCart, deleteProduct, editProduct, getProducts, setProduct } from '../features/redux/slices/productSlice';
import type { ProductFormType } from '../types/productType';

type ProductFormData = {
  name: string;
  desc: string;
  price: string;
};

export default function useProductHooks() : {
  getProductsHandler: () => void
  addProductHandler:  (e: React.FormEvent<HTMLFormElement & ProductFormType>) => void;
  deleteProductHandler: (e: React.MouseEvent<HTMLElement>, id: number) => void;
  editProductHandler: (id: number, data: ProductFormData) => void
} {

  const dispatch = useAppDispatch()


  const getProductsHandler = () : void => {
    getProductService()
    .then((data) => dispatch(getProducts(data)))
    .catch((err) => Promise.reject(err))
  }

  const addProductHandler = (e: React.FormEvent<HTMLFormElement & ProductFormType>, images): void => {
    e.preventDefault()
    const formData = new FormData()
  formData.append('title', e.currentTarget.title.value);
  formData.append('price', e.currentTarget.price.value);
  formData.append('colorId', e.currentTarget.colorId.value);
  formData.append('description', e.currentTarget.description.value);
  formData.append('categoryId', e.currentTarget.categoryId.value);
  
  console.log(e.currentTarget.file)
  for (let i = 0; i < images.length; i++) { 
    formData.append('files', images[i]); 
  } 

    postProductService(formData)
    .then((data) => dispatch(setProduct(data)))
    .catch((err) => Promise.reject(err))
    // e.currentTarget.reset()
  }

  const deleteProductHandler = (e: React.MouseEvent<HTMLElement>, id: number): void =>{
    e.preventDefault()
    deleteProductService(id)
    .then(() => dispatch(deleteProduct(id)))
    .catch((err) => Promise.reject(err))
  }

  const editProductHandler = (id: number, data: ProductFormData) : void => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('desc', data.desc)
    formData.append('price', data.price)
    editProductService(id, formData)
    .then((res) => dispatch(editProduct(res)))
    .catch((err) => Promise.reject(err))
  }


  const addProductCartHandler = (e: React.MouseEvent<HTMLElement>, id:number) : void => {
    e.preventDefault()
    addProductCartService(id)
    .then((addProduct) => dispatch(addToCart(addProduct)))
    .catch((err) => console.error('Ошибка при добавлении в корзину', err))
  }

  return {
    getProductsHandler,
    addProductHandler,
    deleteProductHandler,
    editProductHandler,
  }
}




    