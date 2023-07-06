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
import { CommonService } from 'src/app/shared/services/common.service';
import { ProxyService, Role } from 'src/app/shared/services/proxy.service';

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
  providers: [ProxyService, CommonService],
})
export class RegisterComponent implements OnInit {
  confirmed: boolean = false;
  userTypes: Role[] = [];
  defaultType!: string;

  registerForm!: FormGroup;

  constructor(
    private layoutService: LayoutService,
    private formBuilder: FormBuilder,
    private readonly proxyService: ProxyService,
    private activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  get dark(): boolean {
    return this.layoutService.config.colorScheme !== 'light';
  }

  ngOnInit(): void {
    this.getUserType();
    this.createRegisterForm();

    this.registerForm.get('role_id')?.valueChanges.subscribe((value) => {
      console.log('value is ', value);
    });
  }

  register() {
    console.log('register form is ', this.registerForm.value);
    this.proxyService.Edit_User(this.registerForm.value).subscribe((data) => {
      console.log('data is ', data);
      this.router.navigate(['/auth/verification']);
    });
  }

  getUserType() {
    this.proxyService.Get_Role_By_OWNER_ID().subscribe((data) => {
      this.userTypes = data;
      this.setDefaultType();
    });
  }

  setDefaultType() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.defaultType = params['userType'] || '';

      if (this.defaultType == 'trainer') {
        this.registerForm.get('role_id')?.patchValue(5);
      } else if (this.defaultType == 'client') {
        this.registerForm.get('role_id')?.patchValue(6);
      }
    });
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      user_id: -1,
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role_id: ['', [Validators.required]],
      is_guest: false,
    });
  }
}
