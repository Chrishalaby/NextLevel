import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { DateTime } from 'luxon';
import { CookieService } from 'ngx-cookie-service';
import { AuthRoutes, ModuleRoutes } from 'src/app/shared/enums/routes.enum';
import { TokenKeys } from 'src/app/shared/enums/tokens.enum';
import { JwtData } from 'src/app/shared/models/jwt-data.model';

@Injectable({
  providedIn: 'root',
})
export class AccessTokenService {
  public accessTokenData: JwtData | undefined = undefined;

  constructor(
    private readonly cookieService: CookieService,
    private readonly router: Router
  ) {}

  public isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  public decodeAccessToken(accessToken: string): void {
    const decodedAccessToken: JwtData = jwtDecode(accessToken);

    this.accessTokenData = {
      ...decodedAccessToken,
      expiryDate: DateTime.fromSeconds(
        <number>decodedAccessToken.exp
      ).toJSDate(),
    };
  }

  public setAccessToken(accessToken: string): void {
    this.cookieService.set(
      TokenKeys.JwtCookie,
      accessToken,
      this.accessTokenData?.expiryDate,
      '/'
    );
  }

  public deleteAccessToken(): void {
    this.cookieService.delete(TokenKeys.JwtCookie);
    this.accessTokenData = undefined;
    this.router.navigate([ModuleRoutes.Auth, AuthRoutes.Login]);
  }

  public getAccessToken(): string {
    return this.cookieService.get(TokenKeys.JwtCookie);
  }

  public setMailCookie(mail: string): void {
    this.cookieService.set(TokenKeys.MailCookie, mail);
  }

  public getMailCookie(): string {
    return this.cookieService.get(TokenKeys.MailCookie);
  }

  public setUserIdCookie(userId: number): void {
    this.cookieService.set(TokenKeys.UserIdCookie, userId.toString());
  }

  public getUserIdCookie(): number {
    return parseInt(this.cookieService.get(TokenKeys.UserIdCookie));
  }
}
