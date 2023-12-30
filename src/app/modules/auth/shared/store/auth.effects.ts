import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Actions,
  createEffect,
  CreateEffectMetadata,
  ofType,
} from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { LogInProps, LogInSuccessProps } from '../models/auth-props.model';
import { AccessTokenService } from '../services/access-token.service';
import { AuthRepository } from '../services/auth.repository';
import { AuthActions } from './auth.actions';

@Injectable()
export class AuthEffects {
  public logIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ logInDetails }: LogInProps) =>
        this.authRepository.logIn(logInDetails).pipe(
          map((response: any) => {
            if (!response) {
              throw new Error('Invalid login response');
            }
            const modifiedResponse: LogInSuccessProps = {
              access_token: response.access_token,
              user: response.user,
            };
            return modifiedResponse;
          })
        )
      ),
      map((authResponse: LogInSuccessProps) =>
        AuthActions.loginSuccess(authResponse)
      )
    )
  );

  public logInSuccess$: CreateEffectMetadata = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ access_token, user }: LogInSuccessProps) => {
          this.accessTokenService.decodeAccessToken(access_token);
          this.accessTokenService.setAccessToken(access_token);
          this.accessTokenService.setUserInfo(user);
        }),
        tap(() => {
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly authRepository: AuthRepository,
    private readonly router: Router,
    private readonly accessTokenService: AccessTokenService
  ) {}
}
