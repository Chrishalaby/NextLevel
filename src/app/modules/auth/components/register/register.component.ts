import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ProxyService } from 'src/app/shared/services/proxy.service';
import { AccessTokenService } from '../../shared/services/access-token.service';

@Component({
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    RouterModule,
    PasswordModule,
    CheckboxModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ProxyService],
})
export class RegisterComponent implements OnInit {
  confirmed: boolean = false;
  userTypes: any[] = [
    { label: 'Client', value: 'client' },
    { label: 'Trainer', value: 'trainer' },
  ];

  registerForm!: FormGroup;
  registerClicked: boolean = false;

  constructor(
    private layoutService: LayoutService,
    private formBuilder: FormBuilder,
    // private readonly proxyService: ProxyService,
    private activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly accessTokenService: AccessTokenService,
    private readonly httpClient: HttpClient
  ) {}

  get dark(): boolean {
    return this.layoutService.config.colorScheme !== 'light';
  }

  ngOnInit(): void {
    this.createRegisterForm();
    this.setUserTypeByParam();
  }

  register() {
    this.registerClicked = true;
    this.registerForm
      .get('username')
      ?.setValue(this.registerForm.get('username')?.value.toLowerCase());

    this.httpClient
      .post('/users', this.registerForm.value)
      .subscribe((data: any) => {
        this.accessTokenService.setMailCookie(
          this.registerForm.get('email')?.value
        );
        this.router.navigate(['/auth/verification']);
      });
  }

  setUserTypeByParam() {
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log('Query Params:', params);
      const paramUserType = params['userType'] || '';
      this.registerForm.get('userType')?.setValue(paramUserType || 'client');
      console.log(this.registerForm.value);
    });
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      username: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required],
        // Validators.pattern(
        //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        // ),
      ],
      userType: ['', [Validators.required]],
    });
  }
}
