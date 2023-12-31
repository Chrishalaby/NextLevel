import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];

  ngOnInit() {
    this.model = [
      {
        label: 'Pages',
        icon: 'pi pi-fw pi-briefcase',
        items: [
          {
            label: 'Profile',
            icon: 'pi pi-fw pi-user',
            items: [
              {
                label: 'Create About',
                icon: 'pi pi-fw pi-user-edit',
                routerLink: ['/trainer-profile/create-aboutus'],
              },
              // {
              //   label: 'Show About',
              //   icon: 'pi pi-fw pi-user-edit',
              //   routerLink: ['/trainer-profile/show-aboutus'],
              // },
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
}
