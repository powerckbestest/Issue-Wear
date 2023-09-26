import apiClient from "./apiConfig";



export function getColorService() : Promise {
    return apiClient
    .get('http://localhost:3001/api/colors')
    .then(({data}) => data)
    .catch((err) => Promise.reject(err))
}


export function getCategories() : Promise {
    return apiClient
    .get('http://localhost:3001/api/categories')
    .then(({data}) => data)
    .catch((err) => Promise.reject(err))
}

export function getSizes() : Promise  {
    return apiClient
    .get('http://localhost:3001/api/sizes')
    .then(({data}) => data)
    .catch((err) => Promise.reject(err))
}