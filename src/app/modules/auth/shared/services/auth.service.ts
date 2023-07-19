import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AccessTokenService } from './access-token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userMail: string = '';
  userId: number = 0;
  private isLoggedInSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(private accessTokenService: AccessTokenService) {
    this.isLoggedInSubject = new BehaviorSubject<boolean>(
      this.accessTokenService.isLoggedIn()
    );
  }

  getUserMail() {
    return this.userMail;
  }

  getUserId() {
    return this.userId;
  }

  setLocalUserId(userId: number) {
    this.userId = userId;
  }

  setLocalUserMail(userMail: string) {
    this.userMail = userMail;
  }
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  // Update the login status
  updateLoginStatus(): void {
    this.isLoggedInSubject.next(this.accessTokenService.isLoggedIn());
  }
}
