import { createAsyncThunk } from '@reduxjs/toolkit';
import { authCheckService } from '../../../services/authService';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { setUser } from '../slices/userSlice';

const userCheckActionThunk = createAsyncThunk('user/userCheckActionThunk', async () => {
  try {
    const data = await authCheckService();
    console.log(data)
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
});

export default userCheckActionThunk