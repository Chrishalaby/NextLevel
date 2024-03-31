import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { Trainer } from '../../../shared/models/trainer.model';
import { TrainerService } from './../../../shared/services/trainer.service';
@Component({
  templateUrl: './aboutus.component.html',
  standalone: true,
  imports: [CommonModule, AvatarModule, CardModule, TabViewModule],
})
export class AboutUsComponent implements OnInit {
  visibleMember: number = -1;
  trainer!: Trainer;

  constructor(private readonly trainerService: TrainerService) {}

  ngOnInit(): void {
    this.trainerService.getTrainerProfile().subscribe((trainerProfile) => {
      const parsedEducationalBackground = JSON.parse(
        trainerProfile.educationalBackground
      );
      this.trainer = {
        ...trainerProfile,
        educationalBackground: parsedEducationalBackground,
      };
    });
  }
}
