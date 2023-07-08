import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { ProxyService } from 'src/app/shared/services/proxy.service';
@Component({
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    RouterModule,
    CheckboxModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  providers: [ProxyService, CommonService, MessageService],
})
export class LoginComponent implements OnInit {
  rememberMe: boolean = false;
  loginForm!: FormGroup;

  constructor(
    private layoutService: LayoutService,
    private readonly formBuilder: FormBuilder,
    private readonly proxyService: ProxyService,
    private readonly messageService: MessageService
  ) {}

  get dark(): boolean {
    return this.layoutService.config.colorScheme !== 'light';
  }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      user_name: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  login() {
    this.proxyService.Authenticate(this.loginForm.value).subscribe((res) => {
      console.log('res', res);
      console.log('form', this.loginForm.value);
      if (res == null) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Invalid username or password',
        });
      }
    });
  }
}
