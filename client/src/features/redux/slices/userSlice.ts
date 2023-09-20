import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { AuthUserType, UserType } from '../../../types/userTypes';
import userCheckActionThunk from '../actions/userActions';

const initialState: AuthUserType = {
  status: 'fetching',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState as AuthUserType,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => ({
      status: 'success',
      user: action.payload,
    }),
    setUserErr: (state) => ({
      status: 'failed',
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(userCheckActionThunk.pending, (state, action) => {
      state.status = 'fetching';
    });
    builder.addCase(userCheckActionThunk.fulfilled, (state, action) => {
      state.status = 'success';
    });
    builder.addCase(userCheckActionThunk.rejected, (state, action) => {
      state.status = 'failed';
    });
  },
});

export default userSlice.reducer;

export const { setUser, setUserErr } = userSlice.actions;
