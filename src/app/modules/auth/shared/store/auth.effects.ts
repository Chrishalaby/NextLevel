import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Actions,
  createEffect,
  CreateEffectMetadata,
  ofType,
} from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
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
            // Check for response validity
            if (!response) {
              throw new Error('Invalid login response');
            }
            const modifiedResponse: LogInSuccessProps = {
              accessToken: response.accessToken,
              user: response.user,
            };
            return AuthActions.loginSuccess(modifiedResponse);
          }),
          catchError((error) =>
            of(
              AuthActions.loginFailure({
                error: error.message,
                statusCode: error.status,
              })
            )
          )
        )
      )
    )
  );

  public logInSuccess$: CreateEffectMetadata = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ accessToken, user }: LogInSuccessProps) => {
          // Handle successful login
          this.accessTokenService.decodeAccessToken(accessToken);
          this.accessTokenService.setAccessToken(accessToken);
          this.accessTokenService.setUserInfo(user);
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  public logInFailure$: CreateEffectMetadata = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginFailure),
        tap(({ error, statusCode }) => {
          let message = 'An unexpected error occurred.';
          if (statusCode) {
            if (statusCode >= 400 && statusCode < 500) {
              message = 'Wrong Credentials, or user not found'; // Customize this message as needed
            } else if (statusCode >= 500) {
              message = 'Server error: Please try again later.';
            }
          }
          this.notificationsService.showMessage({
            detail: message,
          });
        })
      ),
    { dispatch: false }
  );


  constructor(
    private readonly actions$: Actions,
    private readonly authRepository: AuthRepository,
    private readonly router: Router,
    private readonly accessTokenService: AccessTokenService,
    private readonly notificationsService: NotificationsService
  ) {}
}
