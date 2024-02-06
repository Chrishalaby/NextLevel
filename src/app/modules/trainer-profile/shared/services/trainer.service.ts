import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  constructor(private http: HttpClient) {}

  getUniversities(): Observable<any[]> {
    return this.http.get<any[]>('http://universities.hipolabs.com/search');
  }

  getTrainerProfile(): Observable<Trainer> {
    return this.http.get<Trainer>(
      `${environment.apiBaseUrl}${BackendControllerRoute.Trainer}${TrainerParams.Show}`
    );
  }


  updateTrainerProfile(trainer: Trainer): Observable<Trainer> {
    return this.http.post<Trainer>(
      `${environment.apiBaseUrl}${BackendControllerRoute.Trainer}${TrainerParams.Update}`,
      trainer
    );
  }

}
