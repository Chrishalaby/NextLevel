import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { EffectsModule, provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { MessageService } from 'primeng/api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { REDUCER_PROVIDER, getInitialState, reducerToken } from './app.store';
import { AppLayoutModule } from './layout/app.layout.module';
import { AuthEffects } from './modules/auth/shared/store/auth.effects';
import { AUTH_INTERCEPTOR_PROVIDER } from './shared/interceptors/auth.interceptor';
import { USER_PROVIDER } from './shared/providers/user.provider';
import { ProxyService } from './shared/services/proxy.service';
import { LogoutConfirmationDialogComponent } from './logout-confirmation-dialog/logout-confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonModule } from 'primeng/button';
@NgModule({
  declarations: [AppComponent, LogoutConfirmationDialogComponent],
  imports: [
    ButtonModule,
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    AppLayoutModule,
    EffectsModule.forRoot([AuthEffects]),
  ],
  providers: [
    AUTH_INTERCEPTOR_PROVIDER,
    REDUCER_PROVIDER,
    USER_PROVIDER,
    provideStore(reducerToken, { initialState: getInitialState }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
    provideEffects([]),
    MessageService,
    ProxyService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
