import { createFeature, createReducer, on } from '@ngrx/store';

import { AuthActions } from './auth.actions';
import { AuthState } from './auth.state';

export const authInitialState: AuthState = {
  user: null,
  authPending: false,
  error: ""
};

export const authFeature = createFeature({
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
    ),
    on(
      AuthActions.loginFailure,
      (state, { error }): AuthState => ({
        ...state,
        authPending: false,
        error, // Update state with error message
      })
    )
  ),
});

export const { name, reducer, selectAuthState, selectUser, selectAuthPending  } =
  authFeature;
