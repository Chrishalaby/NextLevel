import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/envonment.prod';

declare const gapi: any;
declare const google: any;
@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  // private CLIENT_ID = environment.googleClientId;
  private CLIENT_ID =
    '188626381328-2kqsqqh2dqatt51ahggabvors2f55q1e.apps.googleusercontent.com';
  private API_KEY = environment.googleApiKey;
  private DISCOVERY_DOC =
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
  private SCOPES = 'https://www.googleapis.com/auth/calendar';
  private tokenClient: any;
  private redirectUri = 'http://localhost:4200/trainer-profile/calendar';
  private gapiInited = false;
  private gisInited = false;

  constructor(private readonly httpClient: HttpClient) {}

  initializeGoogleApiClients(): void {
    // Load gapi client
    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://apis.google.com/js/api.js';
    scriptElement.onload = () => this.gapiLoaded();
    document.body.appendChild(scriptElement);
  }

  loadGisClient(): void {
    // Load Google Identity Services
    console.log('Loading Google Identity Services');
    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://accounts.google.com/gsi/client';
    scriptElement.onload = () => this.gisLoaded();
    document.body.appendChild(scriptElement);
  }

  gapiLoaded() {
    console.log('Google API loaded');
    gapi.load('client', () => this.initializeGapiClient());
  }

  async initializeGapiClient() {
    console.log('Initializing Google API client');
    await gapi.client.init({
      apiKey: this.API_KEY,
      discoveryDocs: [this.DISCOVERY_DOC],
    });
    console.log('Google API client initialized');
    this.gapiInited = true;
    this.maybeEnableButtons();
  }

  // Example adjustment to ensure tokenClient is initialized
  gisLoaded() {
    return new Promise((resolve) => {
      console.log('Google Identity Services loaded');
      this.tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: this.CLIENT_ID,
        scope: this.SCOPES,
        callback: (response: any) => {
          console.log('Token response:', response);
          this.handleTokenResponse(response);
          resolve(true);
        },
        // Add error handling here as needed
      });
      this.gisInited = true;
    });
  }

  // Then adjust the call to ensure it waits for gisLoaded
  // async initializeGapiAndGis() {
  //   await this.gapiLoaded(); // Assume this is also adjusted to return a Promise
  //   await this.gisLoaded(); // Wait for gisLoaded to complete
  //   // Now you can safely call exchangeCodeForTokens
  // }

  handleTokenResponse(response: any) {
    console.log('Token response:', response);
    if (response.credential) {
      console.log('Credential:', response.credential);
      this.exchangeCodeForTokens(response.credential);
    } else {
      console.error('Error:', response.error);
    }
  }

  maybeEnableButtons() {
    if (this.gapiInited && this.gisInited) {
      document.getElementById('authorize_button')!.style.visibility = 'visible';
    }
  }

  handleAuthClick() {
    // Define the URL for Google OAuth consent screen
    const authUrl =
      `https://accounts.google.com/o/oauth2/auth?` +
      `client_id=${this.CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(`${this.redirectUri}`)}` + // The redirect URI you configured in Google Cloud Console
      `&scope=${encodeURIComponent(this.SCOPES)}` +
      `&response_type=code` + // Use "code" for server-side OAuth
      `&prompt=consent`; // Prompt the user for consent every time

    // Redirect the user to Google's OAuth consent screen
    window.location.href = authUrl;
  }

  exchangeCodeForTokens(code: string) {
    // Parse the query string to get the code
    console.log('I AM HERE 1');
    if (code && this.tokenClient) {
      console.log('I AM HERE 2');
      // Exchange the code for tokens
      this.tokenClient.exchangeCode(code).then(
        (res: any) => {
          console.log('I AM HERE 3');
          // The user is now signed in with Google
          console.log('Access token:', res.access_token);
          console.log('ID token:', res.id_token);
          console.log('Expires in:', res.expires_in);
          console.log('Scope:', res.scope);
          console.log('First issued at:', res.first_issued_at);
          console.log('Expires at:', res.expires_at);
          console.log('Token type:', res.token_type);
          this.sendTokenToServer(res.id_token);
        },
        (err: any) => {
          // Handle error
          console.error('Error exchanging code:', err);
          console.error('################## Error');
        }
      );
    } else {
      console.error('No code found');
    }
  }

  sendTokenToServer(idToken: string) {
    console.log('Sending token to server:', idToken);
    this.httpClient
      .post(`${environment.apiBaseUrl}/calendar/token`, { idToken })
      .subscribe((res) => {
        console.log('Token sent to server:', res);
      });
  }

  fetchGoogleCalendarToken(): Observable<any> {
    return this.httpClient
      .get(`${environment.apiBaseUrl}/calendar/get-token`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching Google Calendar token:', error);
          return throwError(() => error);
        })
      );
  }

  fetchCalendarEvents(token: string): Observable<any> {
    const headers = { Authorization: `Bearer ${token}` };
    const calendarId = 'primary'; // Use 'primary' for the primary calendar or specify a different calendar ID
    const apiUrl = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`;

    return this.httpClient.get(apiUrl, { headers });
  }
}
