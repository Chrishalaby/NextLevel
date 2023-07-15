import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { AuthService } from 'src/app/modules/auth/shared/services/auth.service';
import { ProxyService } from 'src/app/shared/services/proxy.service';
@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
  ],
  providers: [ProxyService, MessageService],
})
export class AddClientComponent implements OnInit {
  clientForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly proxyService: ProxyService,
    private readonly authService: AuthService,
    private readonly messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.createClientForm();
  }

  createClientForm() {
    this.clientForm = this.formBuilder.group({
      client_first_name: ['', Validators.required],
      client_last_name: ['', Validators.required],
      trainer_id: [this.authService.getUserId()],
    });
  }

  addNewClient() {
    console.log(this.clientForm.value);
    this.proxyService
      .Add_Guest_Client(this.clientForm.value)
      .subscribe((res) => {
        if (res) {
          this.router.navigate(['/trainer-profile/add-bundle']);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Client already exists',
          });
        }
      });
  }
}
