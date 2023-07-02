import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TrainerService } from '../../../shared/services/trainer.service';

@Component({
  selector: 'app-create-aboutus',
  templateUrl: './create-aboutus.component.html',
  styleUrls: ['./create-aboutus.component.scss'],
  standalone: true,
  imports: [
    InputTextModule,
    FileUploadModule,
    InputTextareaModule,
    AutoCompleteModule,
    CommonModule,
    ChipsModule,
    ChipModule,
    ReactiveFormsModule,
    AvatarModule,
  ],
  providers: [MessageService],
})
export class CreateAboutusComponent implements OnInit {
  // private subscription!: Subscription;

  universities: any[] = [];
  filterdUniversities: any[] = [];

  uploadedCertifications: any[] = [];
  specialityChipValues: string[] = ['Body Building'];

  profileForm!: FormGroup;

  constructor(
    private messageService: MessageService,
    private readonly trainerService: TrainerService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getuniversities();
    this.createForm();
  }

  onSelectProfilePicture(event: any) {
    if (event.files.length > 0) {
      const file: File = event.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        this.profileForm.patchValue({
          profilePicture: reader.result,
        });
      };

      reader.readAsDataURL(file);
    }
  }

  onUploadCertifications(event: any) {
    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded with Basic Mode',
    });
  }

  getuniversities() {
    this.trainerService.getUniversities().subscribe((universities) => {
      this.universities = universities;
    });
  }

  filterUniversities(event: any) {
    const filtered: any[] = [];
    const query = event.query;
    for (let i = 0; i < this.universities.length; i++) {
      const country = this.universities[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filterdUniversities = filtered;
  }

  createForm() {
    this.profileForm = this.formBuilder.group({
      fullName: [''],
      briefBio: [''],
      profilePicture: [''],
      // specialities array of strings
      specialities: [''],
      educationalBackground: [''],
      // certifications array of objects (images)
      certifications: [''],
      phoneNumber: [''],
      email: ['', Validators.email],
      tiktok: [''],
      instagram: [''],
      linkedin: [''],
    });
  }

  submitProfile() {
    const profile = this.profileForm.value;
    this.trainerService.updateTrainerProfile(profile);
  }

  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }
}
