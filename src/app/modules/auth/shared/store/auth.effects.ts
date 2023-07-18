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
import { AuthResponse } from '../models/auth-response.model';
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
            const modifiedResponse = {
              ...response,
              accessToken: response.Ticket,
            };
            delete modifiedResponse.Ticket;

            return modifiedResponse;
          })
        )
      ),
      map((authResponse: AuthResponse) =>
        AuthActions.loginSuccess({ accessToken: authResponse.accessToken })
      )
    )
  );

  public logInSuccess$: CreateEffectMetadata = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        map(({ accessToken }: LogInSuccessProps) => accessToken),
        tap((accessToken: string) =>
          this.accessTokenService.decodeAccessToken(accessToken)
        ),
        tap((accessToken: string) =>
          this.accessTokenService.setAccessToken(accessToken)
        ),
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
