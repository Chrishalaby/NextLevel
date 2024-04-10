import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  priceId: string = '';
  subscriptionType: string = '';
  constructor(
    private readonly httpClient: HttpClient,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    console.log('ngOnInit started'); // Check if ngOnInit is called

    try {
      this.stripe = Stripe(
        'pk_test_51P1tkOCgNLrByVR9FxRcy4ghJS7uRJKnAq0DlJJc9zfSBfwQvwcheAVUuk4VcAHNwAgY0v7JlPd4g18qgpbdqkO200RugHrSoe'
      );
      console.log('Stripe initialized');

      const params = await firstValueFrom(this.route.params);
      console.log('Route parameters:', params);

      this.subscriptionType = params['subscriptionType']; // get the subscription type from the route
      this.priceId = params['paymentId']; // get the payment ID from the route
      console.log('Initializing checkout', this.subscriptionType, this.priceId);

      await this.initializeCheckout();
    } catch (error) {
      console.error('Error in ngOnInit:', error);
    }
  }

  async fetchClientSecret(): Promise<string> {
    try {
      console.log(
        'Fetching client secret',
        this.subscriptionType,
        this.priceId
      );
      const response = await firstValueFrom(
        this.httpClient.post<{ clientSecret: string }>(
          '/open-ai/create-checkout-session',
          {
            priceId: this.priceId,
            subscriptionType: this.subscriptionType,
          } // use the correct price ID
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
    console.log('Initializing checkout', this.subscriptionType, this.priceId);
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
