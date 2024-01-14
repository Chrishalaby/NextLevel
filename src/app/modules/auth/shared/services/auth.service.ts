import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AccessTokenService } from './access-token.service'; // Importing AccessTokenService

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // BehaviorSubject to manage the isLoggedIn state
  private isLoggedInSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(private accessTokenService: AccessTokenService) {
    // Initializing isLoggedInSubject with the initial login state obtained from AccessTokenService
    this.isLoggedInSubject = new BehaviorSubject<boolean>(
      this.accessTokenService.isLoggedIn()
    );
  }

  // Observable to subscribe to the isLoggedInSubject changes
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  // Method to update the login status
  updateLoginStatus(): void {
    // Updates the isLoggedInSubject with the current login status obtained from AccessTokenService
    this.isLoggedInSubject.next(this.accessTokenService.isLoggedIn());
  }
}

