import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthRoutes, ModuleRoutes } from 'src/app/shared/enums/routes.enum';
import { AccessTokenService } from './access-token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly accessTokenService: AccessTokenService
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLogin();
  }

  checkLogin(): boolean {
    if (this.accessTokenService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate([ModuleRoutes.Auth, AuthRoutes.Login]);
      return false;
    }
  }
}
