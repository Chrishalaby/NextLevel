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
import { AccessTokenService } from 'src/app/modules/auth/shared/services/access-token.service';
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
    InputNumberModule,
  ],
  providers: [ProxyService, MessageService],
})
export class AddClientComponent implements OnInit {
  clientForm!: FormGroup;
  countries: any[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly proxyService: ProxyService,
    private readonly accessTokenService: AccessTokenService,
    private readonly messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.createClientForm();
    this.getCountries();
  }

  createClientForm() {
    this.clientForm = this.formBuilder.group({
      client_first_name: ['', Validators.required],
      client_last_name: ['', Validators.required],
      phone_number: [null, Validators.required],
      phone_ext: ['961', Validators.required],
      trainer_id: [this.accessTokenService.getUserIdCookie()],
    });
  }

  addNewClient() {
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

  getCountries() {
    this.proxyService.Get_Country_By_OWNER_ID().subscribe((data) => {
      this.countries = data;
      console.log(data);
    });
  }
}
