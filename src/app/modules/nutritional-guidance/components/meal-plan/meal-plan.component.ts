import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { TabViewModule } from 'primeng/tabview';
import { NutritionService } from '../../shared/services/nutrition.service';

@Component({
  selector: 'app-meal-plan',
  templateUrl: './meal-plan.component.html',
  standalone: true,
  imports: [
    TabViewModule,
    ReactiveFormsModule,
    DropdownModule,
    MultiSelectModule,
    ButtonModule,
    InputNumberModule,
  ],
})
export class MealPlanComponent implements OnInit {
  mealPlanFormChefI!: FormGroup;
  mealPlanFormChefII!: FormGroup;

  mealPlanResponse: any;

  mealPeriodOptions: any[] = [
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
    { label: 'Quarterly', value: 'quarterly' },
  ];
  dairyPreferencesOptions: any[] = [
    { label: 'Vegetarian', value: 'vegetarian' },
    { label: 'Vegan', value: 'vegan' },
    { label: 'Pescatarian', value: 'pescatarian' },
    { label: 'Flexitarian/Semi-Vegetarian', value: 'flexitarian' },
    { label: 'Paleo', value: 'paleo' },
    { label: 'Ketogenic (Keto)', value: 'keto' },
    { label: 'Low-Carb', value: 'low-carb' },
    { label: 'Mediterranean', value: 'mediterranean' },
    { label: 'DASH (Dietary Approaches to Stop Hypertension)', value: 'dash' },
    { label: 'Whole30', value: 'whole30' },
    { label: 'Plant-Based', value: 'plant-based' },
    { label: 'Halal', value: 'halal' },
    { label: 'Kosher', value: 'kosher' },
  ];
  restrictionsOptions: any[] = [
    { label: 'Gluten-Free', value: 'gluten-free' },
    { label: 'Lactose-Free', value: 'lactose-free' },
    { label: 'Dairy-Free', value: 'dairy-free' },
    { label: 'Low-FODMAP', value: 'low-fodmap' },
    { label: 'Nut-Free', value: 'nut-free' },
    { label: 'Soy-Free', value: 'soy-free' },
    { label: 'Egg-Free', value: 'egg-free' },
    { label: 'Shellfish-Free', value: 'shellfish-free' },
    { label: 'Low-Sodium', value: 'low-sodium' },
    { label: 'Low-Sugar/Sugar-Free', value: 'low-sugar/sugar-free' },
    { label: 'Low-Fat', value: 'low-fat' },
    { label: 'High-Fiber', value: 'high-fiber' },
    { label: 'Diabetic', value: 'diabetic' },
  ];

  intolerancesOptions: any[] = [
    { label: 'Dairy', value: 'dairy' },
    { label: 'Egg', value: 'egg' },
    { label: 'Gluten', value: 'gluten' },
    { label: 'Grain', value: 'grain' },
    { label: 'Peanut', value: 'peanut' },
    { label: 'Seafood', value: 'seafood' },
    { label: 'Sesame', value: 'sesame' },
    { label: 'Shellfish', value: 'shellfish' },
    { label: 'Soy', value: 'soy' },
    { label: 'Sulfite', value: 'sulfite' },
    { label: 'Tree Nut', value: 'tree nut' },
    { label: 'Wheat', value: 'wheat' },
  ];

  dietOptions: any[] = [
    { label: 'Gluten-Free', value: 'gluten free' },
    { label: 'Ketogenic', value: 'ketogenic' },
    { label: 'Vegetarian', value: 'vegetarian' },
    { label: 'Lacto-Vegetarian', value: 'lacto-vegetarian' },
    { label: 'Ovo-Vegetarian', value: 'ovo-vegetarian' },
    { label: 'Vegan', value: 'vegan' },
    { label: 'Pescetarian', value: 'pescetarian' },
    { label: 'Paleo', value: 'paleo' },
    { label: 'Primal', value: 'primal' },
    { label: 'Whole30', value: 'whole30' },
  ];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly nutritionService: NutritionService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    // {
    //   "action": "meal_plan",
    //     "data": {
    //  "meal_period": "weekly",
    //        "dietary_preference": "vegetarian",
    //        "restrictions": ["gluten-free"]
    //     }
    //  }
    this.mealPlanFormChefI = this.formBuilder.group({
      meal_period: [''],
      dietary_preference: [''],
      restrictions: [''],
    });

    this.mealPlanFormChefII = this.formBuilder.group({
      meal_period: [''],
      intolerances: [''],
      diet: [''],
      exclude_ingredients: [''],
      protein_min: [''],
      protein_max: [''],
      fat_min: [''],
      fat_max: [''],
      carbs_min: [''],
      carbs_max: [''],
      min_calories: [''],
      max_calories: [''],
    });
  }

  submitMealPlan() {
    this.nutritionService.submitChefIMealPlan(this.mealPlanFormChefI.value);
    // response from this call should look like this based on chatGPT:
    //   {
    //     "status": "success",
    //     "action": "meal_plan",
    //     "data": {
    //        "meal_plan": "Sample weekly meal plan",
    //        "recipes": "List of custom recipes",
    //        "nutritional_information": "Nutritional breakdown",
    //     }
    //  }
    this.mealPlanResponse = {
      status: 'success',
      action: 'meal_plan',
      data: {
        meal_plan: 'Sample weekly meal plan',
        recipes: 'List of custom recipes',
        nutritional_information: 'Nutritional breakdown',
      },
    };
  }
}
