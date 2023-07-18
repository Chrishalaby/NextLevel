import { createFeature, createReducer, on } from '@ngrx/store';

import { Feature } from '../types/ngrx.types';
import { AuthActions } from './auth.actions';
import { AuthState } from './auth.state';

export const authInitialState: AuthState = {
  user: null,
  authPending: false,
};

export const authFeature: Feature<
  Record<string, any>,
  'auth',
  AuthState
> = createFeature({
  name: 'auth',
  reducer: createReducer(
    authInitialState,
    on(
      AuthActions.login,
      (state: AuthState): AuthState => ({
        ...state,
        authPending: true,
      })
    ),
    on(
      AuthActions.loginSuccess,
      (state: AuthState): AuthState => ({
        ...state,
        authPending: false,
      })
    )
  ),
});

export const {
  name,
  reducer,
  selectAuthState,
  selectUser,
  selectAuthPending,
}: Feature<Record<string, any>, 'auth', AuthState> = authFeature;
