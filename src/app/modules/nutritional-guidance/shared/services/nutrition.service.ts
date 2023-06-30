import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NutritionService {
  constructor(private http: HttpClient) {}

  submitChefIMealPlan(mealPlan: any) {
    return this.http.post(
      'https://jsonplaceholder.typicode.com/posts',
      mealPlan
    );
  }
}
