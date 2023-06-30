import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Trainer } from '../../../shared/models/trainer.model';
import { TrainerService } from '../../../shared/services/trainer.service';

@Component({
  templateUrl: './aboutus.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class AboutUsComponent implements OnInit {
  private subscription!: Subscription;

  visibleMember: number = -1;
  trainerProfile: Trainer = {
    id: 0,
    fullName: 'chris chris',
    briefBio: 'this is a brief bio',
    profilePicture: 'https://picsum.photos/200',

    email: 'thisemail@gmail.com',
    phoneNumber: '123456789',
    specialities: ['body building', 'weight loss'],
    educationalBackground: 'this is the educational background',
    certifications: ['certification 1', 'certification 2'],
    tiktok: 'tiktok',
    instagram: 'instagram',
    linkedin: 'linkedin',
  };

  constructor(private readonly trainerService: TrainerService) {}

  ngOnInit(): void {
    this.trainerService.getTrainerProfile().subscribe((trainerProfile) => {
      this.trainerProfile = trainerProfile;
    });
  }

  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }
}
