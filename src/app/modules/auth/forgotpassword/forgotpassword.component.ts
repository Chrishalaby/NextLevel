import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppConfigModule } from 'src/app/layout/config/app.config.module';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  templateUrl: './forgotpassword.component.html',
  standalone: true,
  imports: [RouterModule, AppConfigModule],
})
export class ForgotPasswordComponent {
  constructor(private layoutService: LayoutService) {}

  get dark(): boolean {
    return this.layoutService.config.colorScheme !== 'light';
  }
}
