import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthRoutes, ModuleRoutes } from 'src/app/shared/enums/routes.enum';
import { AccessTokenService } from './access-token.service';

@Injectable({
  providedIn: 'root',
})
export class VerificationRoutingGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly accessTokenService: AccessTokenService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isLoggedIn = this.accessTokenService.isLoggedIn();

    if (isLoggedIn || !route.queryParams['token']) {
      this.router.navigate(['/']); // Redirect to the home page or another page as needed
      return false;
    }

    return true;
  }
}
