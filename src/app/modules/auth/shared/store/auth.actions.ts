import { ActionCreatorProps, createActionGroup, props } from '@ngrx/store';
import { ActionGroup } from '@ngrx/store/src/action_group_creator_models';
import { LogInProps, LogInSuccessProps } from '../models/auth-props.model';

export const AuthActions: ActionGroup<
  'Auth',
  {
    Login: ActionCreatorProps<LogInProps>;
    'Login Success': ActionCreatorProps<LogInSuccessProps>;
  }
> = createActionGroup({
  source: 'Auth',
  events: {
    Login: props<LogInProps>(),
    'Login Success': props<LogInSuccessProps>(),
  },
});
