import { createAction } from '@reduxjs/toolkit';

export const signInRequest = createAction<{ email: string; password: string }>('@auth/SIGN_IN_REQUEST');
export const signInSuccess = createAction<{ token: string; }>('@auth/SIGN_IN_SUCCESS');
export const signInFailure = createAction('@auth/SIGN_IN_FAILURE');