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
import { CookieService } from 'ngx-cookie-service';
import { TokenKeys } from 'src/app/shared/enums/tokens.enum';

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

@Injectable({
  providedIn: 'root',
})

export class TrainerGuard{

  constructor(
    private readonly router: Router,
    private readonly cookieService: CookieService,
  ){}

canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean {
  const isTrainerRoute = route.routeConfig?.path === 'trainer-profile';
  let isTrainer: boolean = this.checkIfIsTrainer();

  if (isTrainerRoute) {
    if (isTrainer) {
      console.log("isTrainer: " + isTrainer);
      return true;
    } 
    else {
      this.router.navigate(['/home-page']);
      return false;
    }
  }
  else{
    return true;
  }
}

private checkIfIsTrainer(): boolean {
  const userCookie = this.cookieService.get(TokenKeys.UserCookie);

  if (userCookie) {
    try {
      const userData = JSON.parse(userCookie);
      const userType = userData.userType;
      if (userData && userType) {
        console.log(userType);
        if (userType === 'trainer') {
          return true;
        }
      } else {
        console.error('NULL VALUE FOR COOKIE.');
        return false;
      }
    } catch (error) {
      console.error('Error parsing JSON from the cookie:', error);
    }
    
  }
  return false;

}

}
