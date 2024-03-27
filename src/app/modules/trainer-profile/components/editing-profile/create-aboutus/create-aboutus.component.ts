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
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { environment } from 'src/environments/envonment.prod';
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
    DropdownModule,
    ImageModule,
  ],
})
export class CreateAboutusComponent implements OnInit {
  universities: any[] = [];
  filterdUniversities: any[] = [];
  uploadedCertifications: any[] = [];
  specialityChipValues: string[] = [];
  // educationalLevelOptions: any[] = [
  //   { value: 'none', label: 'No formal education' },
  //   { value: 'Primary', label: 'Primary education' },
  //   {
  //     value: 'Secondary',
  //     label: 'Secondary education or high school',
  //   },
  //   { value: 'GED', label: 'GED' },
  //   { value: 'Vocational', label: 'Vocational qualification' },
  //   { value: 'B.S', label: "Bachelor's degree" },
  //   { value: 'M.S', label: "Master's degree" },
  //   { value: 'P.H.D', label: 'Doctorate or higher' },
  // ];
  profileForm!: FormGroup;
  prevInfo: Trainer = {
    id: 0,
    firstName: '',
    lastName: '',
    briefBio: '',
    profilePicture: '',
    specialities: [],
    educationalBackground: '',
    // educationalLevel: '',
    // nameOfQualification: '',
    certifications: [],
    phoneNumber: '',
    email: '',
    tiktok: '',
    instagram: '',
    linkedin: '',
  };
  imageBaseUrl = environment.imageBaseUrl;

  constructor(
    private readonly trainerService: TrainerService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getuniversities();
    this.createForm();

    this.trainerService.getTrainerProfile().subscribe((profile) => {
      this.profileForm.patchValue(profile);
      this.prevInfo = profile;
    });
  }

  onSelectProfilePicture(event: any) {
    if (event && event.files && event.files.length > 0) {
      const file: File = event.files[0];

      const formData = new FormData();
      formData.append('profilePicture', file);

      this.trainerService.uploadProfilePicture(formData).subscribe({
        next: (response: any) => {
          this.profileForm.patchValue({
            profilePicture: response.imageUrl,
          });
        },
        error: (error: any) => {
          console.error('Error uploading file: ', error);
        },
      });
    }
  }

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
    const removedFile: File = event.file;
    console.log('removed file:', removedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      const removedFileBase64: string = reader.result as string;

      const removedFileIndex: number =
        this.uploadedCertifications.indexOf(removedFileBase64);
      console.log('index of file', removedFileIndex);
      if (removedFileIndex !== -1) {
        this.uploadedCertifications.splice(removedFileIndex, 1);
        this.profileForm.patchValue({
          certifications: this.uploadedCertifications,
        }); // Update the form value
      }
      console.log(this.uploadedCertifications);
    };

    reader.readAsDataURL(removedFile);
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
      // educationalLevel: [null, Validators.required],
      educationalBackground: [''],
      // nameOfQualification: [''],
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
