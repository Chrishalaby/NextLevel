import { createActionGroup, props } from '@ngrx/store';
import { LogInProps, LogInSuccessProps } from '../models/auth-props.model';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    Login: props<LogInProps>(),
    'Login Success': props<LogInSuccessProps>(),
  },
});
