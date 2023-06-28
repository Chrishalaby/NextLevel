import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AppConfigModule } from 'src/app/layout/config/app.config.module';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  templateUrl: './verification.component.html',
  standalone: true,
  imports: [RouterModule, AppConfigModule, InputTextModule, ButtonModule],
})
export class VerificationComponent {
  val1!: number;

  val2!: number;

  val3!: number;

  val4!: number;

  constructor(private layoutService: LayoutService) {}

  get dark(): boolean {
    return this.layoutService.config.colorScheme !== 'light';
  }
  onDigitInput(event: any) {
    let element;
    if (event.code !== 'Backspace')
      if (event.code.includes('Numpad') || event.code.includes('Digit')) {
        element = event.srcElement.nextElementSibling;
      }
    if (event.code === 'Backspace')
      element = event.srcElement.previousElementSibling;

    if (element == null) return;
    else element.focus();
  }
}
