import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userMail: string = '';
  userId: number = 0;

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
}
