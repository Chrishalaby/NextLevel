import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AccessTokenService } from '../modules/auth/shared/services/access-token.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
})
export class AppTopbarComponent implements OnInit, OnDestroy {
  @ViewChild('menubutton') menuButton!: ElementRef;

  isLoggedOut: boolean = true;

  private subscription: Subscription = new Subscription();

  constructor(
    public layoutService: LayoutService,
    private accessTokenService: AccessTokenService
  ) {}

  ngOnInit(): void {
    const islogged = this.accessTokenService.isLoggedOut.subscribe(
      (isLoggedOut) => {
        this.isLoggedOut = isLoggedOut;
      }
    );
    this.subscription.add(islogged);
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
