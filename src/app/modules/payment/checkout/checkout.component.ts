import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
declare var Stripe: any;
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  template: `<div id="checkout">
    <!-- Stripe checkout form will be inserted here -->
  </div> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent implements OnInit {
  stripe: any;

  constructor(private readonly httpClient: HttpClient) {}

  async ngOnInit() {
    this.stripe = Stripe(
      'pk_test_51P1tkOCgNLrByVR9FxRcy4ghJS7uRJKnAq0DlJJc9zfSBfwQvwcheAVUuk4VcAHNwAgY0v7JlPd4g18qgpbdqkO200RugHrSoe'
    );
    // Call fetchClientSecret directly to see if it triggers the API call.
    await this.initializeCheckout();
  }

  async fetchClientSecret(): Promise<string> {
    try {
      const response = await firstValueFrom(
        this.httpClient.post<{ clientSecret: string }>(
          '/open-ai/create-checkout-session',
          { priceId: 'price_1P1uS3CgNLrByVR9168vb0js' } // use the correct price ID
        )
      );
      console.log('Response from fetchClientSecret:', response);
      return response.clientSecret;
    } catch (error) {
      console.error('Error in fetchClientSecret:', error);
      throw error;
    }
  }
  async initializeCheckout() {
    try {
      const clientSecret = await this.fetchClientSecret();
      if (clientSecret) {
        const checkout = await this.stripe.initEmbeddedCheckout({
          clientSecret: clientSecret,
        });
        checkout.mount('#checkout');
        console.log('Stripe checkout initialized:', checkout);
      } else {
        throw new Error('Client secret is undefined');
      }
    } catch (error) {
      console.error('Error initializing checkout:', error);
    }
  }
}
