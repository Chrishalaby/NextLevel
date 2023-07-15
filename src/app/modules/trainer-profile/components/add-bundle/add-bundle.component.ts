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
import { AuthService } from 'src/app/modules/auth/shared/services/auth.service';
import { ProxyService } from 'src/app/shared/services/proxy.service';

@Component({
  selector: 'app-add-bundle',
  templateUrl: './add-bundle.component.html',
  styleUrls: ['./add-bundle.component.scss'],
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
  clients: any;
  bundleForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private readonly proxyService: ProxyService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getTrainerClients();
    this.createBundleForm();
    // this.proxyService
    //   .Get_Sessions_bundle_By_TRAINER_ID_Adv({
    //     TRAINER_ID: this.authService.getUserId(),
    //   })
    //   .subscribe((res: any) => {
    //   });
  }

  createBundleForm() {
    this.bundleForm = this.formBuilder.group({
      sessions_bundle_id: [-1],
      client_id: [null, Validators.required],
      trainer_id: [this.authService.getUserId()],
      sessions_number: [null, Validators.required],
      total_price: [null, Validators.required],
      currency_id: [1],
      description: [''],
    });
  }
  addNewBundle() {
    this.proxyService
      .Edit_Sessions_bundle(this.bundleForm.value)
      .subscribe(() => {
        this.router.navigate(['/trainer-profile/calendar']);
      });
  }

  getTrainerClients() {
    this.proxyService
      .GetClientsByTrainerId({
        TRAINER_ID: this.authService.getUserId(),
      })
      .subscribe((res: any) => {
        this.clients = res.Trainer_Clients.map((client: any) => ({
          fullName: client.First_Name + ' ' + client.Last_Name,
          user_id: client.User_Id,
        }));
      });
  }
}
