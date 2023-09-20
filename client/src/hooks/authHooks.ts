/* eslint-disable react-hooks/rules-of-hooks */
import type React from 'react';
import { logoutService, signInService, signUpService } from '../services/authService';
import { useAppDispatch } from './reduxHooks';
import { setUser, setUserErr } from '../features/redux/slices/userSlice';

export default function authHooks(): {
  signUpActionHandler: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  signInActionHandler: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  signOutActionHandler: (e: React.MouseEvent<HTMLElement>) => Promise<void>;
} {
  const dispatch = useAppDispatch();

  const signUpActionHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data = await signUpService(formData);
      dispatch(setUser(data));
    } catch (err) {
      dispatch(setUserErr());
    }
  };

  const signInActionHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data = await signInService(formData);
      dispatch(setUser(data));
    } catch (err) {
      dispatch(setUserErr());
    }
  };

  const signOutActionHandler = async (e: React.MouseEvent<HTMLElement>): Promise<void> => {
    try {
      e.preventDefault();
      await logoutService();
      dispatch(setUserErr());
    } catch (err) {
      return Promise.reject(err);
    }
  };

  return {
    signUpActionHandler,
    signInActionHandler,
    signOutActionHandler,
  };
}
