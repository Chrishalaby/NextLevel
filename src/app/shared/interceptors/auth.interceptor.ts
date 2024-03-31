import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable } from 'rxjs';
import { AccessTokenService } from 'src/app/modules/auth/shared/services/access-token.service';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly accessTokenService: AccessTokenService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = this.accessTokenService.getAccessToken();

    const apiReq = request.clone({
      url: `${environment.apiBaseUrl}${request.url}`,
    });

    if (accessToken) {
      const authReq = apiReq.clone({
        headers: apiReq.headers.set('Authorization', `Bearer ${accessToken}`),
      });
      return next.handle(authReq);
    }

    return next.handle(apiReq);
  }
}

export const AUTH_INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
