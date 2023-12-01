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
  defaultType!: string;

  registerForm!: FormGroup;

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
    // this.getUserType();
    this.createRegisterForm();
  }

  register() {
    // this.proxyService
    //   .Edit_User(this.registerForm.value)
    //   .subscribe((data: any) => {
    //     this.authService.setLocalUserId(data.User_Id);
    //     this.authService.setLocalUserMail(data.Email);
    //     this.router.navigate(['/auth/verification']);
    //   });

    this.httpClient
      .post('http://localhost:3000/users', this.registerForm.value)
      .subscribe((data: any) => {
        console.log(data);
        this.accessTokenService.setMailCookie(data.Email);
        this.router.navigate(['/auth/verification']);
      });
  }

  // getUserType() {
  //   this.proxyService.Get_Role_By_OWNER_ID().subscribe((data) => {
  //     this.userTypes = data;
  //     this.setDefaultType();
  //   });
  // }

  setDefaultType() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.defaultType = params['userType'] || '';

      if (this.defaultType == 'trainer') {
        this.registerForm.get('userType')?.patchValue('trainer');
      } else if (this.defaultType == 'client') {
        this.registerForm.get('userType')?.patchValue('client');
      }
    });
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      // user_id: -1,
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      userType: ['', [Validators.required]],
      // role_id: ['', [Validators.required]],
      // is_guest: false,
      // USER_TYPE_CODE: ['ADMIN'],
    });
  }
}
