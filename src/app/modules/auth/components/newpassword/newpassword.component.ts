import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { AuthRepository } from '../../shared/services/auth.repository';
@Component({
  templateUrl: './newpassword.component.html',
  standalone: true,
  imports: [PasswordModule, ButtonModule, ReactiveFormsModule, MessagesModule],
})
export class NewPasswordComponent {
  resetPasswordForm!: FormGroup;
  private readonly passwordRegex = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  );

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authRepository: AuthRepository,
    private readonly router: Router,
    private readonly notificationsService: NotificationsService
  ) {}

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.passwordMatchValidator()) {
      this.authRepository
        .newPassword(this.resetPasswordForm.value)
        .subscribe(() => {
          this.notificationsService.showSuccessMessage(
            'Password changed successfully!'
          );

          this.router.navigate(['/']);
        });
    } else {
      this.notificationsService.showErrorMessage(
        'Password does not match / Invalid password format'
      );
    }
  }

  passwordMatchValidator() {
    return (
      (this.resetPasswordForm.get('newPassword')?.value ===
      this.resetPasswordForm.get('confirmPassword')?.value
        ? true
        : false) &&
      this.passwordRegex.test(this.resetPasswordForm.get('newPassword')?.value)
    );
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
