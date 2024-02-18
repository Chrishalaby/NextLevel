import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ClientsTrainersService } from 'src/app/shared/services/cliens-trainers.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    InputNumberModule,
  ],
})
export class AddClientComponent implements OnInit {
  clientForm!: FormGroup;
  countries: any[] = [];
  trainerId: any;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly clientstrainersService: ClientsTrainersService,
    private readonly notificationsService: NotificationsService
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
          this.notificationsService.showSuccessMessage(
            'Client added successfully'
          );
          this.router.navigate(['/trainer-profile/add-bundle']);
        } else {
          this.notificationsService.showErrorMessage('Error adding client');
        }
      });
  }
}
