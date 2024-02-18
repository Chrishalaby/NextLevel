import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/envonment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthRepository {
  constructor(private readonly httpClient: HttpClient) {}

  logIn(logInDetails: any): Observable<any> {
    return this.httpClient.post(
      environment.apiBaseUrl + '/auth/login',
      logInDetails
    );
  }

  newPassword(newPasswordDetails: any): Observable<any> {
    return this.httpClient.post(
      environment.apiBaseUrl + '/auth/change-password',
      newPasswordDetails
    );
  }
}
