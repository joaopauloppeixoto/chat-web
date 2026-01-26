import { createSlice } from '@reduxjs/toolkit';
import { signInSuccess, signInFailure, signInRequest } from './actions';

interface AuthState {
  token: string | null;
  signed: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  token: null,
  signed: false,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut(state) {
      state.token = null;
      state.signed = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInRequest, (state) => {
        state.loading = true;
      })
      .addCase(signInSuccess, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.signed = true;
      })
      .addCase(signInFailure, (state) => {
        state.loading = false;
      });
  },
});

export const { signOut } = authSlice.actions;
export default authSlice.reducer;