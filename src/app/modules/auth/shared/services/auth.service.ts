import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getUserMail() {
    return localStorage.getItem('userMail');
  }

  getUserId() {
    return parseInt(localStorage.getItem('userId') || '2');
  }

  setLocalUserId(userId: number) {
    localStorage.setItem('userId', userId.toString());
  }

  setLocalUserMail(userMail: string) {
    localStorage.setItem('userMail', userMail);
  }
}
