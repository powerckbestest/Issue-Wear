import type React from 'react'
import { useAppDispatch } from './reduxHooks';
import { addProductCartService, deleteProductService, editProductService, getProductService, postProductService } from '../services/productService';
import { addToCart, deleteProduct, editProduct, getProducts, setProduct } from '../features/redux/slices/productSlice';

type ProductFormData = {
  name: string;
  desc: string;
  price: string;
};

export default function productHooks() : {
  getProductsHandler: () => void
  addProductHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  deleteProductHandler: (e: React.MouseEvent<HTMLElement>, id: number) => void;
  editProductHandler: (id: number, data: ProductFormData) => void
} {

  const dispatch = useAppDispatch()


  const getProductsHandler = () : void => {
    getProductService()
    .then((data) => dispatch(getProducts(data)))
    .catch((err) => Promise.reject(err))
  }

  const addProductHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const title = formData.get('') as string
    if(title === ''){
      alert('Введите название товара')
      return 
    }
    postProductService(formData)
    .then((data) => dispatch(setProduct(data)))
    .catch((err) => Promise.reject(err))
    e.currentTarget.reset()
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
