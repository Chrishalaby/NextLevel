import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from 'src/app/shared/models/store.model';
import { LogInDetails } from '../models/auth-details.model';
import { AuthActions } from './auth.actions';
import { selectAuthPending } from './auth.reducer';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  public selectAuthPending$: Observable<boolean> = this.store.pipe(
    select(selectAuthPending)
  );

  constructor(private readonly store: Store<State>) {}

  public logIn(logInDetails: LogInDetails): void {
    this.store.dispatch(AuthActions.login({ logInDetails }));
  }
}
