import { BrowserModule } from '@angular/platform-browser';

import { NgModule, isDevMode } from '@angular/core';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { REDUCER_PROVIDER, getInitialState, reducerToken } from './app.store';
import { AppLayoutModule } from './layout/app.layout.module';
import { AuthEffects } from './modules/auth/shared/store/auth.effects';
import { AUTH_INTERCEPTOR_PROVIDER } from './shared/interceptors/auth.interceptor';
import { USER_PROVIDER } from './shared/providers/user.provider';
import { ProxyService } from './shared/services/proxy.service';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppLayoutModule,
    EffectsModule.forRoot([AuthEffects]),
    ToastModule,
  ],
  providers: [
    AUTH_INTERCEPTOR_PROVIDER,
    REDUCER_PROVIDER,
    USER_PROVIDER,
    provideStore(reducerToken, { initialState: getInitialState }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      connectInZone: true,
    }),
    provideEffects([]),
    MessageService,
    ProxyService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
