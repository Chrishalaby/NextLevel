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
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
// import { AccessTokenService } from 'src/app/modules/auth/shared/services/access-token.service';
import { ButtonModule } from 'primeng/button';
import { Trainer } from '../../../shared/models/trainer.model';
import { TrainerService } from '../../../shared/services/trainer.service';

@Component({
  selector: 'app-create-aboutus',
  templateUrl: './create-aboutus.component.html',
  styleUrls: ['./create-aboutus.component.scss'],
  standalone: true,
  imports: [
    ButtonModule,
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
  ],
  providers: [MessageService],
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
    private messageService: MessageService,
    private readonly trainerService: TrainerService,
    private readonly formBuilder: FormBuilder // private readonly accessTokenService: AccessTokenService
  ) {}

  ngOnInit(): void {
    this.getuniversities();
    this.createForm();
    this.trainerService.getTrainerProfile().subscribe((trainerProfile) => {
      const parsedTrainer = {
        ...trainerProfile,
        educationalBackground: JSON.parse(
          JSON.parse(trainerProfile.educationalBackground)
        ),
      };
      this.profileForm.patchValue(parsedTrainer);
      console.log(parsedTrainer);
    });
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
