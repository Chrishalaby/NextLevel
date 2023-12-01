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
import { Observable } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ProxyService } from 'src/app/shared/services/proxy.service';
import { AuthFacade } from '../../shared/store/auth.facade';
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
  providers: [ProxyService, MessageService],
})
export class LoginComponent implements OnInit {
  rememberMe: boolean = false;
  loginForm!: FormGroup;
  public pending$: Observable<boolean> = this.authFacade.selectAuthPending$;

  constructor(
    private layoutService: LayoutService,
    private readonly formBuilder: FormBuilder,
    private readonly authFacade: AuthFacade
  ) {}

  get dark(): boolean {
    return this.layoutService.config.colorScheme !== 'light';
  }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  login() {
    this.authFacade.logIn(this.loginForm.value);
  }
}
