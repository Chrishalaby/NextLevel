import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/envonment.prod';

@Injectable({
  providedIn: 'root',
})
export class AIService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getAllOptions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/options`);
  }

  submitWorkoutPlanForm(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/workout-plan`, formData, {
      responseType: 'text',
    });
  }
}
