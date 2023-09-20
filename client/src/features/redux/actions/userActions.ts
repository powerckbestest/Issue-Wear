import { createAsyncThunk } from '@reduxjs/toolkit';
import { authCheckService } from '../../../services/authService';

const userCheckActionThunk = createAsyncThunk('user/userCheckActionThunk', async () => {
  try {
    const data = await authCheckService();
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
});

export default userCheckActionThunk