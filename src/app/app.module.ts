import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { MealPlanComponent } from './modules/nutritional-guidance/components/meal-plan/meal-plan.component';
import { CustomRecipeComponent } from './modules/nutritional-guidance/components/custom-recipe/custom-recipe.component';
@NgModule({
  declarations: [AppComponent, MealPlanComponent, CustomRecipeComponent],
  imports: [BrowserModule, AppRoutingModule, AppLayoutModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
