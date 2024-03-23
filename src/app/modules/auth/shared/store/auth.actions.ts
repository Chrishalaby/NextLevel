import { createActionGroup, props } from '@ngrx/store';
import {
  AuthErrorProps,
  LogInProps,
  LogInSuccessProps,
} from '../models/auth-props.model';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    Login: props<LogInProps>(),
    'Login Success': props<LogInSuccessProps>(),
    'Login Failure': props<AuthErrorProps>(),
  },
});
