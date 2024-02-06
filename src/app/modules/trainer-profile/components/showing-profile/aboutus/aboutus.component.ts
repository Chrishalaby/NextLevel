import { AccessTokenService } from 'src/app/modules/auth/shared/services/access-token.service';
import { TrainerService } from './../../../shared/services/trainer.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Trainer } from '../../../shared/models/trainer.model';

@Component({
  templateUrl: './aboutus.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class AboutUsComponent implements OnInit {
  // private subscription!: Subscription;

  visibleMember: number = -1;
  trainerProfile: Trainer = {
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
    private readonly accessTokenService: AccessTokenService
  ) {}

  ngOnInit(): void {
    ////////////////////////////////////////////////////////////////
    const userId = this.accessTokenService.getUserInfo().id;
    this.trainerService
      .getTrainerProfile()
      .subscribe((trainerProfile) => {
        this.trainerProfile = trainerProfile;
        console.log(trainerProfile)
      });
  }

  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }
}
