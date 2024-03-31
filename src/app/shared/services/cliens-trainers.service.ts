import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ClientsTrainersService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getTrainersClients(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}/clients`);
  }

  createGhostClient(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/create-ghost-client`, data);
  }
}
