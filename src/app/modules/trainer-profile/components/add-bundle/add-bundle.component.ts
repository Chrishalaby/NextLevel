import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/envonment.prod';
import {
  clientBundle,
  CreateBundleDto,
} from '../../shared/models/client.model';
import { Trainer } from '../../shared/models/trainer.model';

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
      `${environment.apiBaseUrl}/users/trainer-profile`
    );
  }

  updateTrainerProfile(trainer: Trainer): Observable<Trainer> {
    return this.http.post<Trainer>(
      `${environment.apiBaseUrl}/users/trainer-profile`,
      trainer
    );
  }

  getTrainerClients(): Observable<clientBundle[]> {
    return this.http.get<clientBundle[]>(
      `${environment.apiBaseUrl}/trainer/clients`
    );
  }

  addNewBundle(bundle: CreateBundleDto): Observable<any> {
    return this.http.post<any>(
      `${environment.apiBaseUrl}/trainer/create-bundle`,
      bundle
    );
  }
}
