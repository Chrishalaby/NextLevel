import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AppConfigModule } from 'src/app/layout/config/app.config.module';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    RouterModule,
    AppConfigModule,
    PasswordModule,
    CheckboxModule,
    InputTextModule,
    ButtonModule,
  ],
})
export class RegisterComponent {
  confirmed: boolean = false;

  constructor(private layoutService: LayoutService) {}

  get dark(): boolean {
    return this.layoutService.config.colorScheme !== 'light';
  }
}
