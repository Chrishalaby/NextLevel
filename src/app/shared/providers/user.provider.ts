import { LOCATION_INITIALIZED } from '@angular/common';
import { APP_INITIALIZER, FactoryProvider, Injector } from '@angular/core';
import { AccessTokenService } from 'src/app/modules/auth/shared/services/access-token.service';

type UserProvider = (
  injector: Injector,
  accessTokenService: AccessTokenService
) => () => Promise<void>;

export const appInitializerFactory: UserProvider =
  (
    injector: Injector,
    accessTokenService: AccessTokenService
  ): (() => Promise<void>) =>
  async (): Promise<void> => {
    await injector.get(LOCATION_INITIALIZED, Promise.resolve(null));

    const accessToken: string = accessTokenService.getAccessToken();

    if (accessToken) {
      accessTokenService.decodeAccessToken(accessToken);
    }
  };

export const USER_PROVIDER: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: appInitializerFactory,
  deps: [Injector, AccessTokenService],
  multi: true,
};
