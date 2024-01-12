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

  // Checks if the user is logged in by verifying the presence of the access token
  public isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  // Decodes the access token and sets the decoded data in accessTokenData property
  public decodeAccessToken(accessToken: string): void {
    const decodedAccessToken: JwtData = jwtDecode(accessToken);

    this.accessTokenData = {
      ...decodedAccessToken,
      expiryDate: DateTime.fromSeconds(
        <number>decodedAccessToken.exp
      ).toJSDate(),
    };
  }

  // Sets the access token in the browser's cookies
  public setAccessToken(accessToken: string): void {
    this.cookieService.set(
      TokenKeys.JwtCookie,
      accessToken,
      this.accessTokenData?.expiryDate,
      '/'
    );
  }

  // Deletes access token and other related cookies, resets accessTokenData, and navigates to login route
  public deleteAccessToken(): void {
    this.cookieService.delete(TokenKeys.JwtCookie);
    this.cookieService.delete(TokenKeys.MailCookie);
    this.cookieService.delete(TokenKeys.UserIdCookie);
    this.cookieService.delete(TokenKeys.UserCookie);
    this.accessTokenData = undefined;
    this.router.navigate([ModuleRoutes.Auth, AuthRoutes.Login]);
  }

  // Retrieves the access token from the browser's cookies
  public getAccessToken(): string {
    return this.cookieService.get(TokenKeys.JwtCookie);
  }

  // Sets and retrieves cookies for mail, user ID, and user info
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

  public setUserInfo(user: any): void {
    this.cookieService.set(TokenKeys.UserCookie, JSON.stringify(user));
  }

  public getUserInfo(): any {
    return JSON.parse(this.cookieService.get(TokenKeys.UserCookie));
  }
}
