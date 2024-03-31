import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { Subscription } from 'rxjs';
import { ClientsTrainersService } from 'src/app/shared/services/cliens-trainers.service';
import { Trainer } from '../../../shared/models/trainer.model';
import { TrainerService } from './../../../shared/services/trainer.service';
@Component({
  templateUrl: './aboutus.component.html',
  standalone: true,
  imports: [CommonModule, AvatarModule, CardModule, TabViewModule],
})
export class AboutUsComponent implements OnInit {
  trainer!: Trainer;
  private subscriptions = new Subscription();

  constructor(
    private readonly trainerService: TrainerService,
    private readonly route: ActivatedRoute,
    private readonly clientsTrainersService: ClientsTrainersService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.queryParams.subscribe((params) => {
        if (params['id']) {
          this.getUserProfileId(+params['id']);
        } else {
          this.getUserProfile();
        }
      })
    );

    this.subscriptions.add(
      this.clientsTrainersService.userSelectedAction$.subscribe(
        (userId: any) => {
          if (userId !== null) {
            this.getUserProfileId(userId);
          }
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getUserProfile() {
    this.trainerService
      .getTrainerProfile()
      .subscribe((trainerProfile: Trainer) => {
        this.trainer = trainerProfile;
      });
  }

  getUserProfileId(id: number) {
    this.trainerService
      .getUserProfileId(id)
      .subscribe((trainerProfile: Trainer) => {
        this.trainer = trainerProfile;
      });
  }
}
