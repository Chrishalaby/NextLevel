import { userType } from './../models/user-type.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AccessTokenService } from './access-token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(private accessTokenService: AccessTokenService) {
    this.isLoggedInSubject = new BehaviorSubject<boolean>(
      this.accessTokenService.isLoggedIn()
    );
   }

  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
   
  updateLoginStatus(): void {
    this.isLoggedInSubject.next(this.accessTokenService.isLoggedIn());
  }

  isLoggedInSync(): boolean {
    return this.isLoggedInSubject.value;
  }
}
