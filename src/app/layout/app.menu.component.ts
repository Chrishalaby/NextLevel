import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccessTokenService } from '../modules/auth/shared/services/access-token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit, OnDestroy {
  model: any[] = [];

  constructor(private readonly accessTokenService: AccessTokenService) {}

  userType: string = '';
  isLoggedOut: boolean = false;
  private subscription: Subscription = new Subscription();

  ngOnInit() {
    const isLogged = this.accessTokenService.isLoggedOut.subscribe(
      (isLoggedOut) => {
        this.isLoggedOut = isLoggedOut;
        this.userType = this.accessTokenService.getUserInfo().userType || '';
        //to be fixed (async thing)
        this.updateMenu();
      }
    );

    this.subscription.add(isLogged);
  }

  updateMenu() {
    this.model = [
      {
        label: 'Pages',
        icon: 'pi pi-fw pi-briefcase',
        items: [
          {
            label: 'Profile',
            visible: this.userType === 'trainer' && !this.isLoggedOut,
            icon: 'pi pi-fw pi-user',
            items: [
              {
                label: 'Create About',
                icon: 'pi pi-fw pi-user-edit',
                routerLink: ['/trainer-profile/create-aboutus'],
              },
              {
                label: 'Show About',
                icon: 'pi pi-fw pi-info-circle',
                routerLink: ['/trainer-profile/show-aboutus'],
              },
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
                icon: 'pi pi-fw pi-plus-circle',
                routerLink: ['/trainer-profile/add-bundle'],
              },
            ],
          },
          {
            label: 'Workout Plan',
            icon: 'pi pi-fw pi-user',
            items: [
              {
                label: 'Create Workout Plan',
                icon: 'pi pi-fw pi-user-edit',
                routerLink: ['/workout-plan/ai-custom-workout'],
              },
            ],
          },
          {
            label: 'Nutritional Guidance',
            icon: 'pi pi-fw pi-user',
            items: [
              {
                label: 'Meal Plan',
                icon: 'pi pi-fw pi-user-edit',
                routerLink: ['/nutritional-guidance/meal-plan'],
              },
            ],
          },

          {
            label: 'Auth',
            icon: 'pi pi-fw pi-user',
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
