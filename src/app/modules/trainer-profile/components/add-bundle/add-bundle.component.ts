import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from 'src/app/modules/auth/shared/services/auth.service';
import { CommonService } from 'src/app/shared/services/common.service';
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
  ],
  providers: [ProxyService, AuthService, CommonService],
})
export class AddBundleComponent implements OnInit {
  clients: any;
  bundleForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private readonly proxyService: ProxyService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getTrainerClients();
    this.createBundleForm();
  }

  createBundleForm() {
    this.bundleForm = this.formBuilder.group({
      clientId: [''],
      sessionAmount: [''],
      bundlePrice: [''],
    });
  }
  addNewBundle() {}

  getTrainerClients() {
    this.proxyService
      .Get_Guest_password_By_TRAINER_ID_Adv({
        TRAINER_ID: this.authService.getUserId(),
      })
      .subscribe((res) => {
        this.clients = res;
        console.log(this.clients);
      });
  }
}
