import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
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

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isLoggedIn = this.accessTokenService.isLoggedIn();


    if (state.url.includes('/login') || state.url.includes('/register')) {
      if (isLoggedIn) {
        this.router.navigate(['/']);
        return false;
      } else {
        return true;
      }
    }
    if (!isLoggedIn) {
      this.router.navigate([ModuleRoutes.Auth, AuthRoutes.Login]);
      return false;
    }
    return true;
  }
}
