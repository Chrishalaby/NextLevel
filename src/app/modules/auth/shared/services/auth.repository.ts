import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ProxyService } from 'src/app/shared/services/proxy.service';
import { AuthResponse } from '../models/auth-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthRepository {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly proxyService: ProxyService,
    private readonly router: Router
  ) {}

  logIn(logInDetails: any): Observable<AuthResponse> {
    return this.proxyService.Authenticate(logInDetails).pipe(
      map((res: any) => {
        if (res == null) {
          throw new Error('Invalid username or password');
        } else {
          this.router.navigate(['/']);
          return res as AuthResponse;
        }
      })
    );
  }
}
