import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  templateUrl: './forgotpassword.component.html',
  standalone: true,
  imports: [RouterModule, InputTextModule, ButtonModule],
})
export class ForgotPasswordComponent {
  constructor(private layoutService: LayoutService) {}

  get dark(): boolean {
    return this.layoutService.config.colorScheme !== 'light';
  }
}
