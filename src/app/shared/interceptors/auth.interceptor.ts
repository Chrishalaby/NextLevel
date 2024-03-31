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
  public constructor(private readonly accessTokenService: AccessTokenService) {}

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = this.accessTokenService.getAccessToken();
    if (accessToken && request.url.includes(environment.apiBaseUrl)) {
      const cloned = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${accessToken}`),
      });
      return next.handle(cloned);
    }
    return next.handle(request);
  }
}

export const AUTH_INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
