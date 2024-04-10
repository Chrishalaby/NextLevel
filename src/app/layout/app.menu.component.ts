import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccessTokenService } from '../modules/auth/shared/services/access-token.service';
import { AuthRepository } from '../modules/auth/shared/services/auth.repository';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit, OnDestroy {
  model: any[] = [];

  constructor(
    private readonly accessTokenService: AccessTokenService,
    private readonly authRepository: AuthRepository
  ) {}

  user: any;
  isLoggedOut: boolean = false;
  private subscription: Subscription = new Subscription();

  ngOnInit() {
    const loggedInSub = this.authRepository
      .getLoggedIn()
      .subscribe((isLoggedIn: any) => {
        this.isLoggedOut = !isLoggedIn;
        this.updateMenu();
      });
    this.subscription.add(loggedInSub);
  }

  updateMenu() {
    this.user = this.accessTokenService.getUserInfo() || '';
    this.model = [
      {
        label: 'Pages',
        icon: 'pi pi-fw pi-briefcase',
        items: [
          {
            label: 'Profile',
            visible: this.user.userType === 'trainer',
            icon: 'pi pi-fw pi-user',
            items: [
              {
                label: 'Create About',
                icon: 'pi pi-fw pi-user-edit',
                routerLink: ['/trainer-profile/create-aboutus'],
              },
              {
                label: 'Show About',
                icon: 'pi pi-fw pi-user',
                routerLink: ['/trainer-profile/show-aboutus'],
              },
            ],
          },
          {
            label: 'Work',
            visible: this.user.userType === 'trainer',
            icon: 'pi pi-fw pi-briefcase',
            items: [
              {
                label: 'Calendar',
                icon: 'pi pi-fw pi-calendar',
                routerLink: ['/trainer-profile/calendar'],
              },
              {
                label: 'Add Client',
                icon: 'pi pi-fw pi-user-plus',
                routerLink: ['/trainer-profile/add-client'],
              },
              {
                label: 'Add Bundle',
                icon: 'pi pi-fw pi-book',
                routerLink: ['/trainer-profile/add-bundle'],
              },
            ],
          },
          {
            label: 'Workout Plan',
            items: [
              {
                label: 'Create Workout Plan',
                routerLink: ['/workout-plan/ai-custom-workout'],
              },
            ],
          },
          {
            label: 'Nutritional Guidance',
            items: [
              {
                label: 'Meal Plan',
                routerLink: ['/nutritional-guidance/meal-plan'],
              },
            ],
          },

          {
            label: 'Auth',
            items: [
              {
                label: 'Login',
                icon: 'pi pi-fw pi-sign-in',
                routerLink: ['/auth/login'],
                visible: this.isLoggedOut,
              },
              // {
              //   label: 'Error',
              //   icon: 'pi pi-fw pi-times-circle',
              //   routerLink: ['/auth/error'],
              // },
              // {
              //   label: 'Access Denied',
              //   icon: 'pi pi-fw pi-lock',
              //   routerLink: ['/auth/access-denied'],
              // },
              {
                label: 'Register',
                icon: 'pi pi-fw pi-user-plus',
                routerLink: ['/auth/register'],
                visible: this.isLoggedOut,
              },
              {
                label: 'Forgot Password',
                icon: 'pi pi-fw pi-question',
                routerLink: ['/auth/forgot-password'],
              },
              {
                label: 'New Password',
                icon: 'pi pi-fw pi-cog',
                routerLink: ['/auth/new-password'],
              },
              // {
              //   label: 'Verification',
              //   icon: 'pi pi-fw pi-envelope',
              //   routerLink: ['/auth/verification'],
              // },
            ],
          },
        ],
      },
    ];
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
