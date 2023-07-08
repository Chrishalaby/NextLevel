import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { ProxyService } from 'src/app/shared/services/proxy.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  templateUrl: './verification.component.html',
  standalone: true,
  imports: [
    RouterModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ProxyService, CommonService],
})
export class VerificationComponent implements OnInit {
  verficationForm!: FormGroup;
  userMail: string = '';
  userId: number = 0;

  constructor(
    private layoutService: LayoutService,
    private readonly proxyService: ProxyService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.createVerificationForm();

    this.userMail = this.authService.getUserMail() || 'tefe7';
    this.userId = this.authService.getUserId() || 2;
    console.log('user mail', this.userMail);
    console.log('user id', this.userId);
  }

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

  onVerify() {
    const code =
      this.verficationForm.value.val1 +
      this.verficationForm.value.val2 +
      this.verficationForm.value.val3 +
      this.verficationForm.value.val4;
    this.proxyService
      .UPC_VALIDATE_VALIDATION_CODE({
        USER_ID: this.userId,
        VALIDATION_CODE: code,
      })
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(['/auth/login']);
      });
  }

  createVerificationForm() {
    this.verficationForm = this.formBuilder.group({
      val1: [null],
      val2: [null],
      val3: [null],
      val4: [null],
    });
  }
}
