import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, InputTextModule, ButtonModule],
})
export class AddClientComponent implements OnInit {
  clientForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createClientForm();
  }

  createClientForm() {
    this.clientForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
    });
  }

  addNewClient() {
    console.log(this.clientForm.value);
    // route to create bundle
  }
}
