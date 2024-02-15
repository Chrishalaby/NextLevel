import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/envonment.prod';
import {
  CreateBundleDto,
  CreateSessionEventDto,
  clientBundle,
} from '../models/client.model';
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

  getClientBundle(
    clientId: string,
    isGhost: boolean
  ): Observable<clientBundle> {
    // Initialize HttpParams
    let params = new HttpParams();
    // Append the isGhost parameter
    params = params.append('isGhost', isGhost.toString());

    return this.http.get<clientBundle>(
      `${environment.apiBaseUrl}/trainer/client-bundle/${clientId}`,
      { params } // Include the parameters in the request
    );
  }

  createSessionEvent(event: CreateSessionEventDto): Observable<any> {
    return this.http.post<any>(
      `${environment.apiBaseUrl}/trainer/create-event`,
      event
    );
  }

  getTrainerEvents(): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/trainer/events`);
  }
}
