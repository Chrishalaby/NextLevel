import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule],
  template: `<section id="success">
    <p>
      We appreciate your business! A confirmation email will be sent to
      {{ customerEmail }}. If you have any questions, please
      <a href="mailto:growtopiay7@gmail.com">email us</a>.
    </p>
  </section>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessComponent implements OnInit {
  customerEmail: string = '';

  constructor(
    private readonly httpClient: HttpClient,
    private readonly cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.initializeSessionStatus();
  }

  async initializeSessionStatus() {
    console.log('initializeSessionStatus');
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');
    const response = await lastValueFrom(
      this.httpClient.get<{ status: string; customer_email: string }>(
        `/open-ai/session-status?session_id=${sessionId}`
      )
    );
    if (response?.status == 'complete') {
      this.customerEmail = response.customer_email;
      this.cdr.detectChanges(); // Trigger change detection manually
    }
  }
}
