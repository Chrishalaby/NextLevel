import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AvatarModule } from 'primeng/avatar';
import { AccessTokenService } from 'src/app/modules/auth/shared/services/access-token.service';
import { Trainer } from '../../../shared/models/trainer.model';
import { TrainerService } from './../../../shared/services/trainer.service';
@Component({
  templateUrl: './aboutus.component.html',
  standalone: true,
  imports: [CommonModule, AvatarModule],
})
export class AboutUsComponent implements OnInit {
  visibleMember: number = -1;
  trainerProfile: Trainer = {
    id: 0,
    firstName: '',
    lastName: '',
    briefBio: '',
    profilePicture: '',
    specialities: [],
    educationalBackground: {},
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
    private readonly accessTokenService: AccessTokenService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const userId = this.accessTokenService.getUserInfo().id;
    this.trainerService.getTrainerProfile().subscribe((trainerProfile) => {
      const parsedEducationalBackground = JSON.parse(
        trainerProfile.educationalBackground
      );
      this.trainerProfile = {
        ...trainerProfile,
        educationalBackground: parsedEducationalBackground,
      };
    });
  }

  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }
}
