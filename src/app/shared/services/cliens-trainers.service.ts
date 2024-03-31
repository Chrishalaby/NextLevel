import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientsTrainersService {
  private userSelectedSubject = new BehaviorSubject<number | null>(null);
  userSelectedAction$ = this.userSelectedSubject.asObservable();

  constructor(private http: HttpClient) {}

  getTrainersClients(id: number): Observable<any> {
    return this.http.get(`/${id}/clients`);
  }

  createGhostClient(data: any): Observable<any> {
    return this.http.post(`/users/create-ghost-client`, data);
  }

  userSelected(userId: number): void {
    this.userSelectedSubject.next(userId);
  }
}
