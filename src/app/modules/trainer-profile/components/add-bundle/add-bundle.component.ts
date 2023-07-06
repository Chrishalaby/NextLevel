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
import { Client } from '../../shared/models/client.model';

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
})
export class AddBundleComponent implements OnInit {
  clients!: Client[];
  bundleForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // get clients to show in dropdown
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
}
