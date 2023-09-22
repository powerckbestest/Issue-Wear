import type {ProductType} from '../types/productType'
import apiClient from './apiConfig'


export function getProductService(): Promise<ProductType[]> {
    return apiClient
    .get<ProductType[]>('/products')
    .then(({data}) => data)
    .catch((err) => Promise.reject(err))
}

export function postProductService(formData: FormData) : Promise< ProductType>{
    return apiClient
    .post<ProductType>('/products', Object.fromEntries(formData))
    .then(({data}) => data)
    .catch((err) => Promise.reject(err))
}

export function deleteProductService(id:number): Promise<number> {
    return apiClient
    .delete<Promise<void>>(`/products/${id}`)
    .then(() => id)
    .catch((err) => Promise.reject(err))
}

export function editProductService(id: number, formData: FormData): Promise<ProductType>{
    return apiClient
    .put<ProductType>(`/products/${id}`, Object.fromEntries(formData))
    .then(({data}) => data)
    .catch((err) => Promise.reject(err))
}

export function getProductInCartService(): Promise<ProductType[]> {
    return apiClient
    .get<ProductType[]>('/cart')
    .then(({data}) => data)
    .catch((err) => Promise.reject(err))
}

export function addProductCartService(id: number) : Promise<ProductType> {
    return apiClient
    .post<ProductType>(`/products/${id}`)
    .then(({data}) => data)
    .catch((err) => Promise.reject(err))
}

export function deleteProductCartService(id:number) : Promise<number> {
    return apiClient
    .delete<Promise<void>>(`/cart/${id}`)
    .then(() => id)
    .catch((err) => Promise.reject(err))
}