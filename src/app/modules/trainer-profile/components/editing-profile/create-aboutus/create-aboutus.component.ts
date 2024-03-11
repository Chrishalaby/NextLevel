import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { Trainer } from '../../../shared/models/trainer.model';
import { TrainerService } from '../../../shared/services/trainer.service';
import { ImageModule } from 'primeng/image';
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
    DropdownModule,
    ImageModule,
  ],
})
export class CreateAboutusComponent implements OnInit {
  // private subscription!: Subscription;

  universities: any[] = [];
  filterdUniversities: any[] = [];
  // isDisabled: boolean = true;
  // isEducated: boolean = false;
  uploadedCertifications: any[] = [];
  specialityChipValues: string[] = [];
  educationalLevelOptions: any[] = [
    { value: 'none', label: 'No formal education' },
    { value: 'Primary', label: 'Primary education' },
    {
      value: 'Secondary',
      label: 'Secondary education or high school',
    },
    { value: 'GED', label: 'GED' },
    { value: 'Vocational', label: 'Vocational qualification' },
    { value: 'B.S', label: "Bachelor's degree" },
    { value: 'M.S', label: "Master's degree" },
    { value: 'P.H.D', label: 'Doctorate or higher' },
  ];
  profileForm!: FormGroup;
  prevInfo: Trainer = {
    id: 0,
    firstName: '',
    lastName: '',
    briefBio: '',
    profilePicture: '',
    specialities: [],
    educationalBackground: '',
    educationalLevel: '',
    nameOfQualification: '',
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
    private readonly notificationsService: NotificationsService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getuniversities();
    this.createForm();

    this.trainerService.getTrainerProfile().subscribe((trainerProfile) => {
      const parsedTrainer = {
        ...trainerProfile,
        educationalBackground: JSON.parse(trainerProfile.educationalBackground),
      };
      this.profileForm.patchValue(parsedTrainer);
      if (parsedTrainer.certifications) {
        console.log(parsedTrainer.certifications);
      }
      console.log(parsedTrainer);
      console.log(this.uploadedCertifications);
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
    if (event && event.files && event.files.length > 0) {
      const file: File = event.files[0]; // Get the first selected file
      const reader = new FileReader();

      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        this.profileForm.patchValue({
          profilePicture: imageUrl, // Assign the image URL to the profilePicture field
        });
      };

      reader.readAsDataURL(file); // Read the file as a data URL
    }
  }

  // Now you can send formData to your backend
  // Example: this.http.post('YOUR_BACKEND_ENDPOINT', formData).subscribe(...);

  onUploadCertifications(event: any) {
    if (event.files.length > 0) {
      const uploadedFiles: File[] = event.files;

      for (const file of uploadedFiles) {
        const reader = new FileReader();

        reader.onloadend = () => {
          this.uploadedCertifications.push(reader.result as string);
          // All files have been processed, update the form
          console.log('patching');
          this.profileForm.patchValue({
            certifications: this.uploadedCertifications,
          });
          console.log(this.profileForm.value);
          console.log(this.uploadedCertifications);
        };

        reader.readAsDataURL(file);
      }
    }
  }

  onRemoveCertification(event: any) {
    console.log('on remove is triggered');
    const removedFile: File = event.file; // Get the removed file
    console.log('removed file:', removedFile);

    // Convert the removed file to a base64 string
    const reader = new FileReader();
    reader.onloadend = () => {
      const removedFileBase64: string = reader.result as string;

      // Find the index of the removed file in the uploadedCertifications array
      const removedFileIndex: number =
        this.uploadedCertifications.indexOf(removedFileBase64);
      console.log('index of file', removedFileIndex);
      if (removedFileIndex !== -1) {
        this.uploadedCertifications.splice(removedFileIndex, 1); // Remove the file from the uploadedCertifications array
        this.profileForm.patchValue({
          certifications: this.uploadedCertifications,
        }); // Update the form value
      }
      console.log(this.uploadedCertifications);
    };

    reader.readAsDataURL(removedFile); // Read the removed file as a data URL (base64)
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
  // checkDisabled(event: any) {
  //   if (event.value === 'none') {
  //     this.profileForm.get('nameOfQualification')?.disable();
  //     this.isDisabled = true;
  //   } else {
  //     this.isDisabled = false;
  //     this.profileForm.get('nameOfQualification')?.enable();
  //   }
  // }

  createForm() {
    this.profileForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      briefBio: [''],
      profilePicture: [''],
      // specialities array of strings
      specialities: [''],
      educationalLevel: [null, Validators.required],
      educationalBackground: [''],
      nameOfQualification: [''],
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
