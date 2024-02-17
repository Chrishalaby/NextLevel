import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Observable, map, switchMap } from 'rxjs';
import {
  BackendControllerRoute,
  TrainerParams,
} from 'src/app/shared/enums/backend.enum';
import { environment } from 'src/environments/envonment.prod';
import { Trainer } from '../models/trainer.model';

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  constructor(
    private http: HttpClient,
    private imageCompress: NgxImageCompressService
  ) {}
  getUniversities(): Observable<any[]> {
    return this.http.get<any[]>('http://universities.hipolabs.com/search');
  }

  getTrainerProfile(): Observable<Trainer> {
    return this.http.get<Trainer>(
      `${environment.apiBaseUrl}${BackendControllerRoute.Trainer}${TrainerParams.Show}`
    );
  }

  updateTrainerProfile(trainer: Trainer): Observable<Trainer> {
    console.log(trainer);
    return this.compressImage(trainer.profilePicture).pipe(
      map((compressedImage) => {
        const trainerProfile = {
          ...trainer,
          profilePicture: compressedImage,
        };
        return trainerProfile;
      }),
      switchMap((trainerProfile) =>
        this.http.post<Trainer>(
          `${environment.apiBaseUrl}${BackendControllerRoute.Trainer}${TrainerParams.Update}`,
          trainerProfile
        )
      )
    );
  }

  compressImage(imageData: string): Observable<string> {
    return new Observable<string>((observer) => {
      this.imageCompress.compressFile(imageData, 1, 50, 50).then(
        (result) => {
          observer.next(result);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }
}
