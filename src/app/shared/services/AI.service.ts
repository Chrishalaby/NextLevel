import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AIService {
  constructor(private http: HttpClient) {}

  getAllOptions(): Observable<any> {
    return this.http.get(`/open-ai/workout-options`);
  }

  submitWorkoutPlanForm(formData: any): Observable<any> {
    return this.http.post(`/open-ai/workout-plan`, formData, {
      responseType: 'text',
    });
  }

  submitMealPlanForm(formData: any): Observable<any> {
    return this.http.post(`/open-ai/meal-plan`, formData, {
      responseType: 'text',
    });
  }
}
