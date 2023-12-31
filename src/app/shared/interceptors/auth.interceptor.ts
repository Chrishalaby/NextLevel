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
import { environment } from 'src/environments/envonment.prod';
import { HttpHeaders } from '../enums/http-headers.enum';
import { ModuleRoutes } from '../enums/routes.enum';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public constructor(private readonly accessTokenService: AccessTokenService) {}

  public intercept(
    request: HttpRequest<typeof HttpHeaders>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const accessToken: string = this.accessTokenService.getAccessToken();
    const isApiRequest: boolean = request.url.includes(environment.apiBaseUrl);
    const isAuthRequest: boolean = request.url.includes(ModuleRoutes.Auth);

    if (!isApiRequest || isAuthRequest || !accessToken) {
      return next.handle(request);
    }

    const authReq: HttpRequest<typeof HttpHeaders> = request.clone({
      headers: request.headers.set(
        HttpHeaders.Authorization,
        `Bearer ${accessToken}`
      ),
    });
    // const authReq: HttpRequest<any> = request.clone({
    //   setParams: {
    //     Ticket: accessToken,
    //   },
    //   headers: request.headers
    //     .set('Content-Type', 'application/json')
    //     .set('ticket', accessToken)
    //     .set('rejectUnauthorized', 'false'),
    // });
    return next.handle(authReq);
  }
}

export const AUTH_INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
