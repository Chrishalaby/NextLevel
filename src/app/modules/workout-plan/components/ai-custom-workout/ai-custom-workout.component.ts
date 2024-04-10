import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabViewModule } from 'primeng/tabview';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TooltipModule } from 'primeng/tooltip';
import { AccessTokenService } from 'src/app/modules/auth/shared/services/access-token.service';
import { AIService } from 'src/app/shared/services/AI.service';
import { ProxyService } from 'src/app/shared/services/proxy.service';
@Component({
  selector: 'app-ai-custom-workout',
  templateUrl: './ai-custom-workout.component.html',
  standalone: true,
  imports: [
    TabViewModule,
    ReactiveFormsModule,
    DropdownModule,
    MultiSelectModule,
    ButtonModule,
    CommonModule,
    TooltipModule,
    InputNumberModule,
    ToggleButtonModule,
    InputNumberModule,
    InputTextModule,
    ProgressSpinnerModule,
    RouterModule,
  ],
  providers: [ProxyService],
})
export class AiCustomWorkoutComponent implements OnInit {
  workoutPlanTrainerIForm!: FormGroup;
  workoutPlanTrainerIIForm!: FormGroup;

  trainer1Response: any;
  trainer2Response: any;
  submitted = false;

  selectedGoal: any;
  genderOptions: any[] = [
    {
      label: 'Male',
      value: 'male',
    },
    {
      label: 'Female',
      value: 'female',
    },
  ];
  injuryOptions: any[] = [
    { label: 'Head Injury', value: 'headInjury' },
    { label: 'Neck Injury', value: 'neckInjury' },
    { label: 'Shoulder Injury', value: 'shoulderInjury' },
    { label: 'Back Injury', value: 'backInjury' },
    { label: 'Chest Injury', value: 'chestInjury' },
    { label: 'Elbow Injury', value: 'elbowInjury' },
    { label: 'Wrist Injury', value: 'wristInjury' },
    { label: 'Hand Injury', value: 'handInjury' },
    { label: 'Hip Injury', value: 'hipInjury' },
    { label: 'Knee Injury', value: 'kneeInjury' },
    { label: 'Ankle Injury', value: 'ankleInjury' },
    { label: 'Foot Injury', value: 'footInjury' },
    { label: 'Cardiovascular Problems', value: 'cardiovascularProblems' },
    { label: 'Respiratory Problems', value: 'respiratoryProblems' },
    { label: 'Metabolic Disorders', value: 'metabolicDisorders' },
    { label: 'Other', value: 'other' },
  ];

  tokensLeft: number = 0;

  options: any = {
    fitnessGoals: [],
    daysPerWeek: [],
    sessionDuration: [],
    fitnessLevel: [],
    exercisePreferences: [],
  };

  constructor(
    private formBuilder: FormBuilder,
    private readonly AIService: AIService,
    private readonly accessTokenService: AccessTokenService
  ) {}

  ngOnInit(): void {
    this.createform();
    this.callOptions();

    this.tokensLeft = this.accessTokenService.getUserInfo().aiRequestToken;
  }

  createform() {
    this.workoutPlanTrainerIIForm = this.formBuilder.group({
      basicInformation: this.formBuilder.group({
        name: ['', Validators.required],
        age: ['', Validators.required],
        gender: ['', Validators.required],
      }),
      medicalHistory: this.formBuilder.group({
        conditions: [''],
        currentMedications: [''],
        injuries: [''],
      }),
      fitnessGoals: this.formBuilder.group({
        primaryGoal: ['', Validators.required],
        secondaryGoals: [''],
      }),
      currentFitnessLevel: this.formBuilder.group({
        currentRoutine: this.formBuilder.group({
          daysPerWeek: [''],
          fitnessLevel: [''],
        }),
        physicalStats: this.formBuilder.group({
          weight: [''],
          height: [''],
          bodyFatPercentage: [null],
        }),
      }),
      availability: this.formBuilder.group({
        daysPerWeek: [''],
        sessionDuration: [''],
      }),
      preferencesAndConstraints: this.formBuilder.group({
        exercisePreferences: [''],
        accessToGym: [false],
        workoutAlone: [false],
        // budget: [''],
      }),
      // nutritionalInformation: this.formBuilder.group({
      //   dietaryPreferences: [''],
      //   dietaryRestrictions: [''],
      //   caloricIntake: [''],
      //   macronutrientDistribution: this.formBuilder.group({
      //     carbs: [''],
      //     protein: [''],
      //     fat: [''],
      //   }),
      // }),
    });

    this.workoutPlanTrainerIForm = this.formBuilder.group({
      basicInformation: this.formBuilder.group({
        name: ['', Validators.required],
        age: ['', Validators.required],
        gender: ['', Validators.required],
      }),
      fitnessGoals: this.formBuilder.group({
        primaryGoal: ['', Validators.required],
      }),
      availability: this.formBuilder.group({
        daysPerWeek: [''],
        sessionDuration: [''],
      }),
    });
  }

  callOptions() {
    this.AIService.getAllOptions().subscribe((res: any) => {
      this.options.fitnessGoals = this.filterOptionsByType(res, 'fitnessGoals');
      this.options.daysPerWeek = this.filterOptionsByType(res, 'daysPerWeek');
      this.options.sessionDuration = this.filterOptionsByType(
        res,
        'sessionDuration'
      );
      this.options.fitnessLevel = this.filterOptionsByType(res, 'fitnessLevel');
      this.options.exercisePreferences = this.filterOptionsByType(
        res,
        'exercisePreferences'
      );
    });
  }

  filterOptionsByType(options: any[], optionType: string) {
    return options
      .filter((option) => option.optionType === optionType)
      .map((option) => ({
        value: option.optionValue,
        label: option.label,
        info: option.info,
      }));
  }

  submitTrainer1() {
    this.submitted = true;
    this.AIService.submitWorkoutPlanForm(
      this.workoutPlanTrainerIForm.value
    ).subscribe({
      next: (res: string) => {
        this.submitted = false;
        this.trainer1Response = res;
      },
      error: (error) => {
        console.error('Error:', error);
        this.submitted = false;
      },
    });
  }
  submitTrainer2() {
    this.submitted = true;
    this.AIService.submitWorkoutPlanForm(
      this.workoutPlanTrainerIIForm.value
    ).subscribe((res: string) => {
      this.submitted = false;
      this.trainer2Response = res;
    });
  }
}
