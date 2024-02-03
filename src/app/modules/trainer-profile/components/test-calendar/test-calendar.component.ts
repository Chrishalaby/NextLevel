import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/envonment.prod';
declare var gapi: any;
@Component({
  selector: 'app-test-calendar',
  standalone: true,
  imports: [CommonModule],
  template: `<button (click)="signIn()">Sign in with Google</button>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestCalendarComponent implements OnInit {
  private clientId: string =
    '188626381328-2kqsqqh2dqatt51ahggabvors2f55q1e.apps.googleusercontent.com'; // Replace with your actual client ID

  constructor(private readonly httpClient: HttpClient) {}

  ngOnInit(): void {
    this.loadAndInitGapi();
  }

  loadAndInitGapi() {
    // Create a new script element
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.onload = () => {
      // Initialize the gapi.client after the script has loaded
      gapi.load('auth2', () => {
        gapi.auth2
          .init({
            client_id: this.clientId,
            scope: 'https://www.googleapis.com/auth/calendar.readonly',
          })
          .then(() => console.log('GAPI client initialized.'));
      });
    };
    script.onerror = (error) => {
      // Handle loading errors
      console.error('Error loading gapi:', error);
    };
    document.head.appendChild(script);
  }

  async signIn() {
    const GoogleAuth = gapi.auth2.getAuthInstance();
    try {
      const googleUser = await GoogleAuth.signIn();
      const id_token = googleUser.getAuthResponse().id_token;
      console.log('ID Token: ', id_token);
      // Send this token to your server
      this.sendTokenToBackend(id_token);
    } catch (error) {
      console.error('Error signing in', error);
    }
  }

  sendTokenToBackend(token: string) {
    // Implement sending the token to your backend via Angular HttpClient
    console.log('Send this token to your backend:', token);
    // Example: this.httpClient.post('YOUR_BACKEND_ENDPOINT', {token: token});

    this.httpClient
      .post(`${environment.apiBaseUrl}/calendar/token`, token)
      .subscribe((res: any) => {
        console.log('Token sent to server:', res);
      });
  }
}
