import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
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

  getTrainerProfile(userId: number): Observable<Trainer> {
    const url = `${environment.apiBaseUrl}/users/trainer-profile/${userId}`;
    
    return this.http.get<Trainer>(url).pipe(
      catchError((error) => {
        console.error('Error fetching trainer profile:', error);
        return throwError('Unable to fetch trainer profile');
      })
    );
  }
  

  updateTrainerProfile(trainer: Trainer): Observable<Trainer> {
    return this.http.post<Trainer>(
      `${environment.apiBaseUrl}/users/trainer-profile`,
      trainer
    );
  }
}
