import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AccessTokenService } from '../modules/auth/shared/services/access-token.service';
import { AuthService } from '../modules/auth/shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LogoutConfirmationDialogComponent } from '../logout-confirmation-dialog/logout-confirmation-dialog.component'; // Create a separate component for the confirmation dialog

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
    private accessTokenService: AccessTokenService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedInSync();
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
    const dialogRef = this.dialog.open(LogoutConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.accessTokenService.deleteAccessToken();
      }
      // else: Do nothing if 'cancel' or the dialog is closed without making a choice
    });
  }
}
