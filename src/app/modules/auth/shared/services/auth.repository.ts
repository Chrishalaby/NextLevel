import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ProxyService } from 'src/app/shared/services/proxy.service';
import { AuthResponse } from '../models/auth-response.model';
import { environment } from 'src/environments/envonment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthRepository {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly proxyService: ProxyService,
    private readonly router: Router
  ) {}

  logIn(logInDetails: any): Observable<any> {
    return this.httpClient.post(environment.apiBaseUrl+'/auth/login',logInDetails)
  }
}
