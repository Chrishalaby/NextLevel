import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientsTrainersService {
  private baseUrl = 'http://localhost:3000'; // Update with your NestJS app URL

  constructor(private http: HttpClient) {}

  getTrainersClients(id:number): Observable<any> {
    
    return this.http.get(`${this.baseUrl}/${id}/clients`);
  }
}
