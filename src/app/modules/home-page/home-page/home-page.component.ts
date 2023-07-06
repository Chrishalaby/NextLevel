import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TimelineModule } from 'primeng/timeline';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [CommonModule, ButtonModule, TimelineModule],
})
export class HomePageComponent {
  howItWorks = [
    { status: '1. Create an Account', info: 'Sign up as a trainer or client.' },
    {
      status: '2. Find a Trainer',
      info: 'Search for a trainer based on your fitness goals and location.',
    },
    {
      status: '3.Book a Session',
      info: 'Book a session with your trainer of choice.',
    },
    { status: '4. Get Fit', info: 'Get fit and stay fit with your trainer.' },
  ];
  constructor(private readonly router: Router) {}

  register(userType: string) {
    this.router.navigate(['/auth/register'], {
      queryParams: { userType: userType },
    });
  }
}
