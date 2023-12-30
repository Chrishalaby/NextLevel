import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/envonment.prod';
import { LogInDetails } from '../models/auth-details.model';
import { LogInSuccessProps } from '../models/auth-props.model';

@Injectable({
  providedIn: 'root',
})
export class AuthRepository {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router
  ) {}

  logIn(logInDetails: LogInDetails): Observable<LogInSuccessProps> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/auth/login', logInDetails)
      .pipe(
        map((res: any) => {
          if (res == null) {
            throw new Error('Invalid username or password');
          } else {
            this.router.navigate(['/']);
            return res as LogInSuccessProps;
          }
        })
      );
  }
}
