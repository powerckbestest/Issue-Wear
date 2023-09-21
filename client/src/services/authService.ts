import type { UserType } from '../types/userTypes';
import apiClient from './apiConfig';

export function signUpService(formData: FormData): Promise<UserType> {
  return apiClient
    .post<UserType>('/auth/signup', Object.fromEntries(formData))
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err));
}

export function signInService(formData: FormData): Promise<UserType> {
  return apiClient
    .post<UserType>('/auth/signin', Object.fromEntries(formData))
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err));
}

export function logoutService(): Promise<number> {
  return apiClient
    .get<number>('/auth/logout')
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err));
}

export function authCheckService(): Promise<UserType> {
    return apiClient
      .get<UserType>('/auth/check')
      .then(({ data }) => data)
      .catch((err) => Promise.reject(err));
  }
  