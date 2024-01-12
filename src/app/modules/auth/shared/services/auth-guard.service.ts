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

  // Method invoked when attempting to activate a route
  canActivate(
    route: ActivatedRouteSnapshot, // Represents the route to be activated
    state: RouterStateSnapshot // Represents the state of the router at the time the route is activated
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Check if the user is logged in by calling the AccessTokenService
    const isLoggedIn = this.accessTokenService.isLoggedIn();

    // If the requested route is '/login'
    if (state.url.includes('/login')) {
      // If already logged in, redirect to home and deny access to the login route
      if (isLoggedIn) {
        this.router.navigate(['/']);
        return false;
      } else {
        // If not logged in, allow access to the login route
        return true;
      }
    }

    // For other routes
    if (isLoggedIn) {
      // If logged in, allow access to the requested route
      return true;
    } else {
      // If not logged in, redirect to the login route and deny access
      this.router.navigate([ModuleRoutes.Auth, AuthRoutes.Login]);
      return false;
    }
  }
}
