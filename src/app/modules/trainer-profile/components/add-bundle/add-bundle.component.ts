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
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProxyService } from 'src/app/shared/services/proxy.service';
import { clientBundle } from '../../shared/models/client.model';
import { TrainerService } from '../../shared/services/trainer.service';

@Component({
  selector: 'app-add-bundle',
  templateUrl: './add-bundle.component.html',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    InputNumberModule,
    DropdownModule,
    InputTextareaModule,
  ],
  providers: [ProxyService],
})
export class AddBundleComponent implements OnInit {
  clients: clientBundle[] = [];
  bundleForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly trainerService: TrainerService
  ) {}

  ngOnInit(): void {
    this.getTrainerClients();
    this.createBundleForm();
  }

  createBundleForm() {
    this.bundleForm = this.formBuilder.group({
      clientId: [null, Validators.required],
      sessionsNumber: [null, Validators.required],
      totalPrice: [null, Validators.required],
      description: [''],
      isGhost: [null],
    });
  }
  addNewBundle() {
    const client = this.clients.find(
      (client) => client.id === this.bundleForm.value.clientId
    );

    if (client?.isGhost) {
      this.bundleForm.value.isGhost = true;
    } else {
      this.bundleForm.value.isGhost = false;
    }

    this.trainerService.addNewBundle(this.bundleForm.value).subscribe(() => {
      this.router.navigate(['/trainer-profile/calendar']);
    });
  }

  getTrainerClients() {
    this.trainerService.getTrainerClients().subscribe((res: clientBundle[]) => {
      this.clients = res;
    });
  }
}
