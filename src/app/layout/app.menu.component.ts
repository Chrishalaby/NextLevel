import { Component, OnInit } from '@angular/core';
import { AuthService } from '../modules/auth/shared/services/auth.service';
import { AccessTokenService } from '../modules/auth/shared/services/access-token.service';
import { TokenKeys } from '../shared/enums/tokens.enum';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];
  

  constructor(private readonly accessTokenService: AccessTokenService, 
    private readonly cookieService: CookieService){}

  ngOnInit() {

    const isLoggedIn = this.accessTokenService.isLoggedIn();
    let isTrainer: boolean = this.handleMenuVisibility();

    console.log('Is logged in: ' + isLoggedIn);
    console.log('Is trainer: ' + isTrainer);

    // Initialize the menu structure when the component initializes
    this.model = [
      {
        label: 'Pages',
        icon: 'pi pi-fw pi-briefcase',
        items: [
          // First top-level menu item: 'Profile'
          {
            label: 'Profile',
            icon: 'pi pi-fw pi-user',
            visible: isTrainer,
            items: [
              // Nested menu items for 'Profile'
              {
                label: 'Create About',
                icon: 'pi pi-fw pi-user-edit',
                routerLink: ['/trainer-profile/create-aboutus'],
              },
              {
                label: 'Calendar',
                icon: 'pi pi-fw pi-user-edit',
                routerLink: ['/trainer-profile/calendar'],
              },
              {
                label: 'Add Client',
                icon: 'pi pi-fw pi-user-edit',
                routerLink: ['/trainer-profile/add-client'],
              },
              {
                label: 'Add Bundle',
                icon: 'pi pi-fw pi-user-edit',
                routerLink: ['/trainer-profile/add-bundle'],
              },
            ],
          },
          // Second top-level menu item: 'Workout Plan'
          {
            label: 'Workout Plan',
            icon: 'pi pi-fw pi-user',
            items: [
              // Nested menu items for 'Workout Plan'
              {
                label: 'Create Workout Plan',
                icon: 'pi pi-fw pi-user-edit',
                routerLink: ['/workout-plan/ai-custom-workout'],
              },
            ],
          },
          // Third top-level menu item: 'Nutritional Guidance'
          {
            label: 'Nutritional Guidance',
            icon: 'pi pi-fw pi-user',
            items: [
              // Nested menu items for 'Nutritional Guidance'
              {
                label: 'Meal Plan',
                icon: 'pi pi-fw pi-user-edit',
                routerLink: ['/nutritional-guidance/meal-plan'],
              },
            ],
          },
          // Fourth top-level menu item: 'Auth'
          {
            label: 'Auth',
            icon: 'pi pi-fw pi-user',
            items: [
              // Nested menu items for 'Auth'
              {
                label: 'Login',
                icon: 'pi pi-fw pi-sign-in',
                routerLink: ['/auth/login'],
                visible: !isLoggedIn,
              },
              {
                label: 'Register',
                icon: 'pi pi-fw pi-user-plus',
                routerLink: ['/auth/register'],
                visible: !isLoggedIn,
              },
              {
                label: 'Forgot Password',
                icon: 'pi pi-fw pi-question',
                routerLink: ['/auth/forgot-password'],
                visible: !isLoggedIn,
              },
              {
                label: 'New Password',
                icon: 'pi pi-fw pi-cog',
                routerLink: ['/auth/new-password'],
              },
            ],
          },
        ],
      },
    ];
  }

  private handleMenuVisibility(): boolean {
    const userCookie = this.cookieService.get(TokenKeys.UserCookie);

    if (userCookie) {
      try {
        const userData = JSON.parse(userCookie);
        const userType = userData.userType;
        if (userData && userType) {
          console.log(userType);
          if (userType === 'trainer') {
            return true;
          }
        } else {
          console.error('NULL VALUE FOR COOKIE.');
          return false;
        }
      } catch (error) {
        console.error('Error parsing JSON from the cookie:', error);
      }
      
    }
    return false;

}

}
