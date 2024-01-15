import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthRoutes, ModuleRoutes } from 'src/app/shared/enums/routes.enum';
import { AccessTokenService } from './access-token.service';


@Injectable({
  providedIn: 'root',
})
export class LoginGuard{

  constructor(
    private readonly router: Router,
    private readonly accessTokenService: AccessTokenService
  ){}

canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean {
  const isLoggedIn = this.accessTokenService.isLoggedIn();
  const isLoginRoute = route.routeConfig?.path === 'register' || 
                    route.routeConfig?.path === 'login' ||  
                    route.routeConfig?.path === 'forgot-password';

if (isLoginRoute) {
  if (isLoggedIn) {
    // User is logged in, redirect to home
    this.router.navigate(['/']);
    return false;
  } else {
    // User is not logged in, allow access to login, register, and forgot-password routes
    return true;
  }
}

// For other routes (not login, register, or forgot-password)
if (isLoggedIn) {
  // User is logged in, allow access to the route
  return true;
} else {
  // User is not logged in, redirect to login
  this.router.navigate([ModuleRoutes.Auth, AuthRoutes.Login]);
  return false;
}

}

}


