import type { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import type { RootState } from '../features/redux/store';

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
