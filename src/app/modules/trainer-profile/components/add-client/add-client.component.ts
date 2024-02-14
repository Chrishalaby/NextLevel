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
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ClientsTrainersService } from 'src/app/shared/services/cliens-trainers.service';
import { ProxyService } from 'src/app/shared/services/proxy.service';
@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    InputNumberModule,
  ],
  providers: [ProxyService, MessageService],
})
export class AddClientComponent implements OnInit {
  clientForm!: FormGroup;
  countries: any[] = [];
  trainerId: any;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly messageService: MessageService,
    private readonly clientstrainersService: ClientsTrainersService
  ) {}

  ngOnInit(): void {
    this.createClientForm();
  }

  createClientForm() {
    this.clientForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: [null, Validators.required],
    });
  }

  addNewClient() {
    this.clientstrainersService
      .createGhostClient(this.clientForm.value)
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
