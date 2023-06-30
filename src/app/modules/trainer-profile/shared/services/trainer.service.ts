import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this.http.get<Trainer>('http://localhost:3000/trainer-profile');
  }

  updateTrainerProfile(trainer: Trainer): Observable<Trainer> {
    return this.http.put<Trainer>(
      'http://localhost:3000/trainer-profile',
      trainer
    );
  }
}
