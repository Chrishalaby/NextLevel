import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AccessTokenService } from 'src/app/modules/auth/shared/services/access-token.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { Trainer } from '../../../shared/models/trainer.model';
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
})
export class CreateAboutusComponent implements OnInit {
  // private subscription!: Subscription;

  universities: any[] = [];
  filterdUniversities: any[] = [];

  uploadedCertifications: any[] = [];
  specialityChipValues: string[] = [];

  profileForm!: FormGroup;
  prevInfo: Trainer = {
    id: 0,
    firstName: '',
    lastName: '',
    briefBio: '',
    profilePicture: '',
    specialities: [],
    educationalBackground: '',
    certifications: [],
    phoneNumber: '',
    email: '',
    tiktok: '',
    instagram: '',
    linkedin: '',
  };

  constructor(
    private readonly trainerService: TrainerService,
    private readonly formBuilder: FormBuilder,
    private readonly accessTokenService: AccessTokenService,
    private readonly notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.getuniversities();
    this.createForm();
    const userId = this.accessTokenService.getUserInfo().id;
    this.trainerService.getTrainerProfile().subscribe((trainerProfile) => {
      this.profileForm.patchValue(trainerProfile);
    });
  }

  // onSelectProfilePicture(event: any) {
  //   if (event.files.length > 0) {
  //     const file: File = event.files[0];
  //     const reader = new FileReader();

  //     reader.onloadend = () => {
  //       this.profileForm.patchValue({
  //         profilePicture: reader.result,
  //       });
  //     };

  //     reader.readAsDataURL(file);
  //   }
  // }

  onSelectProfilePicture(event: any) {
    if (event.files.length > 0) {
      const file: File = event.files[0];
      const formData = new FormData();
      formData.append('profilePicture', file, file.name);
      this.profileForm.patchValue({
        profilePicture: formData,
      });
    }

    // Now you can send formData to your backend
    // Example: this.http.post('YOUR_BACKEND_ENDPOINT', formData).subscribe(...);
  }

  onUploadCertifications(event: any) {
    this.notificationsService.showSuccessMessage(
      'File Uploaded with Basic Mode'
    );
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
      firstName: [''],
      lastName: [''],
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
    this.trainerService.updateTrainerProfile(profile).subscribe();
  }

  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }
}
