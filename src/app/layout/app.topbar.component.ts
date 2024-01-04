import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AccessTokenService } from '../modules/auth/shared/services/access-token.service';
import { AuthService } from '../modules/auth/shared/services/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
})
export class AppTopbarComponent implements OnInit {
  @ViewChild('menubutton') menuButton!: ElementRef;
  isLoggedIn$: Observable<boolean> | undefined;

  constructor(
    public layoutService: LayoutService,
    private authService: AuthService,
    private accessTokenService: AccessTokenService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedInSync(); // Add a synchronous method to get the login status
  }

  onMenuButtonClick() {
    this.layoutService.onMenuToggle();
  }

  onProfileButtonClick() {
    this.layoutService.showProfileSidebar();
  }

  onConfigButtonClick() {
    this.layoutService.showConfigSidebar();
  }

  logout() {
    this.accessTokenService.deleteAccessToken();
  }
}
