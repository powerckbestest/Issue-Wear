import type { OrderFromDb, OrderType, StatusType } from '../types/orderType';
import type { ProductType } from '../types/productType';
import apiClient from './apiConfig';

export function getProductService(): Promise<ProductType[]> {
  return apiClient
    .get<ProductType[]>('/products')
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err));
}

export function postProductService(formData: FormData): Promise<ProductType> {
  return apiClient
    .post<ProductType>('/products', formData)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err));
}

export function deleteProductService(id: number): Promise<number> {
  return apiClient
    .delete<Promise<void>>(`/products/${id}`)
    .then(() => id)
    .catch((err) => Promise.reject(err));
}

export function editProductService(id: number, formData: FormData): Promise<ProductType> {
  return apiClient
    .put<ProductType>(`/products/${id}`, Object.fromEntries(formData))
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err));
}

export function getProductInCartService(): Promise<ProductType[]> {
  return apiClient
    .get<ProductType[]>('/cart')
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err));
}

export function addProductCartService(id: number): Promise<ProductType> {
  return apiClient
    .post<ProductType>(`/cart/${id}`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err));
}

export function deleteProductCartService(id: number): Promise<number> {
  return apiClient
    .delete<Promise<void>>(`/cart/${id}`)
    .then(() => id)
    .catch((err) => Promise.reject(err));
}

// СЕРВИС НА ПОЛУЧЕНИЕ КАРТОЧКИ ПО ЕЕ ID НЕ ЗАБЫТЬ ПРО НЕГО
export function getCardProductService(id: number): Promise<ProductType> {
  return apiClient
    .get<ProductType>(`/products/${id}`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err));
}

export function makeOrderService(formData: FormData): Promise<OrderType> {
  return apiClient
    .post<OrderType>(`/orders`, Object.fromEntries(formData))
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err));
}

export function getOrdersService(): Promise<OrderFromDb[]> {
  return apiClient
    .get<OrderFromDb[]>('/orders')
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err));
}

export function changeOrderStatusService(id: number, formData: FormData): Promise<OrderFromDb> {
  return apiClient
  .put<OrderFromDb>(`/orders/${id}`, formData)
  .then(({data}) => data)
  .catch((err) => Promise.reject(err))
} 

export function getStatusesService(): Promise<StatusType[]> {
  return apiClient
  .get<StatusType[]>('/statuses')
    .then(({data}) => data)
    .catch((err) => Promise.reject(err))
}

export function cancelOrderService(id: number): Promise<number> {
  return apiClient
  .delete<void>(`/orders/${id}`)
  .then(() => id)
  .catch((err) => Promise.reject(err))
}