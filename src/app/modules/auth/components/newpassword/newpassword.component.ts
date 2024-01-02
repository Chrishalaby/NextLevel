import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
@Component({
  templateUrl: './newpassword.component.html',
  standalone: true,
  imports: [
    RouterModule,
    PasswordModule,
    ButtonModule,
    // FormGroup,
    // FormBuilder,
    // Validators,
    // ActivatedRoute,
  ],
})
export class NewPasswordComponent {
  rememberMe: boolean = false;
  resetPasswordForm!: FormGroup;
  token: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token']; // Extract the token from URL
      if (!this.token) {
        // Handle case where token is missing or invalid
      }
    });

    this.resetPasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required]],
      // include other form controls as needed
    });

    this.resetPasswordForm.addControl(
      'token',
      this.formBuilder.control(this.token)
    );
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      const resetPasswordData = this.resetPasswordForm.value;
      // Make the API call to reset the password using resetPasswordData
    }
  }
}
