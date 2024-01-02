import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/envonment.prod';

@Injectable({
  providedIn: 'root',
})
export class ClientsTrainersService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getTrainersClients(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}/clients`);
  }

  getTrainerIdByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/get-id-by-user/${userId}`);
  }

  createGhostClient(createClientDto: any): Observable<any> {
    return this.getTrainerIdByUserId(createClientDto.trainerId).pipe(
      switchMap((trainerId: number) => {
        createClientDto.trainerId = trainerId;
        return this.http.post(`${this.baseUrl}/users/create-ghost-client`, createClientDto);
      })
    );
  }
}
