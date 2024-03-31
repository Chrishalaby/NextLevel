import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  BackendControllerRoute,
  TrainerParams,
} from 'src/app/shared/enums/backend.enum';

import {
  Bundle,
  Client,
  CreateBundleDto,
  CreateSessionEventDto,
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
      `${BackendControllerRoute.Trainer}${TrainerParams.Show}`
    );
  }

  updateTrainerProfile(trainer: Trainer): Observable<Trainer> {
    return this.http.post<Trainer>(
      `${BackendControllerRoute.Trainer}${TrainerParams.Update}`,
      trainer
    );
  }

  getTrainerClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`/trainer/clients`);
  }

  addNewBundle(bundle: CreateBundleDto): Observable<any> {
    return this.http.post<any>(`/trainer/create-bundle`, bundle);
  }

  getClientBundle(clientId: string, isGhost: boolean): Observable<Bundle[]> {
    // Initialize HttpParams
    let params = new HttpParams();
    // Append the isGhost parameter
    params = params.append('isGhost', isGhost.toString());

    return this.http.get<Bundle[]>(
      `/trainer/client-bundle/${clientId}`,
      { params } // Include the parameters in the request
    );
  }

  createSessionEvent(event: CreateSessionEventDto): Observable<any> {
    return this.http.post<any>(`/trainer/create-event`, event);
  }

  getTrainerEvents(): Observable<any> {
    return this.http.get<any>(`/trainer/events`);
  }

  uploadProfilePicture(formData: FormData): Observable<any> {
    return this.http.post<any>(`/trainer/upload-profile-picture`, formData);
  }
  uploadCertification(formData: FormData): Observable<any> {
    return this.http.post<any>(`/trainer/upload-certifications`, formData);
  }

  getUserProfileId(id: number): Observable<any> {
    return this.http.get<any>(`${BackendControllerRoute.User}/${id}`);
  }
}
