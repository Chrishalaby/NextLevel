import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TabViewModule } from 'primeng/tabview';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TooltipModule } from 'primeng/tooltip';
import { ProxyService } from 'src/app/shared/services/proxy.service';

@Component({
  selector: 'app-ai-custom-workout',
  templateUrl: './ai-custom-workout.component.html',
  styleUrls: ['./ai-custom-workout.component.scss'],
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
  ],
  providers: [ProxyService],
})
export class AiCustomWorkoutComponent implements OnInit {
  workoutPlanTrainerIForm!: FormGroup;
  workoutPlanTrainerIIForm!: FormGroup;

  trainer1Response: any;
  trainer2Response: any;

  selectedGoal: any;
  fitnessGoals: any[] = [];
  daysPerWeek: any[] = [];
  sessionDuration: any[] = [];
  fitnessLevel: any[] = [];
  exercisePreferences: any[] = [];
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

  constructor(
    private formBuilder: FormBuilder,
    private readonly proxyService: ProxyService
  ) {}

  ngOnInit(): void {
    this.createform();
    this.callOptions();
  }

  createform() {
    this.workoutPlanTrainerIIForm = this.formBuilder.group({
      basicInformation: this.formBuilder.group({
        name: ['', Validators.required],
        age: ['', Validators.required],
        gender: ['', Validators.required],
        contactInformation: [''],
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
          bodyFatPercentage: [''],
        }),
      }),
      availability: this.formBuilder.group({
        daysPerWeek: [''],
        sessionDuration: [''],
      }),
      preferencesAndConstraints: this.formBuilder.group({
        exercisePreferences: [''],
        accessToGym: [''],
        workoutAlone: [''],
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
    this.getFitnessGoals();
    this.getDaysPerWeek();
    this.getSessionDuration();
    this.getfitnessLevel();
    this.getExercisePreferences();
  }

  getFitnessGoals() {
    this.proxyService
      .GetOptionsByOptionType({ OPTIONTYPE: 'FitnessGoals' })
      .subscribe((res: any) => {
        this.fitnessGoals = res.Options.map((option: any) => ({
          value: option.Value,
          label: option.Label,
          info: option.Info,
        }));
      });
  }

  getDaysPerWeek() {
    this.proxyService
      .GetOptionsByOptionType({ OPTIONTYPE: 'DaysPerWeek' })
      .subscribe((res: any) => {
        this.daysPerWeek = res.Options.map((option: any) => ({
          value: option.Value,
          label: option.Label,
        }));
      });
  }

  getSessionDuration() {
    this.proxyService
      .GetOptionsByOptionType({ OPTIONTYPE: 'SessionDuration' })
      .subscribe((res: any) => {
        this.sessionDuration = res.Options.map((option: any) => ({
          value: option.Value,
          label: option.Label,
        }));
      });
  }

  getfitnessLevel() {
    this.proxyService
      .GetOptionsByOptionType({ OPTIONTYPE: 'FitnessLevel' })
      .subscribe((res: any) => {
        this.fitnessLevel = res.Options.map((option: any) => ({
          value: option.Value,
          label: option.Label,
        }));
      });
  }

  getExercisePreferences() {
    this.proxyService
      .GetOptionsByOptionType({ OPTIONTYPE: 'ExercisePreferences' })
      .subscribe((res: any) => {
        this.exercisePreferences = res.Options.map((option: any) => ({
          value: option.Value,
          label: option.Label,
        }));
      });
  }

  submitTrainer1() {
    console.log(this.workoutPlanTrainerIForm.value);
    this.proxyService
      .Simple_Generated_Workout_Plan(this.workoutPlanTrainerIForm.value)
      .subscribe((res: any) => {
        this.trainer1Response = res;
      });
  }
  submitTrainer2() {
    this.proxyService
      .Complicated_Generated_Workout_Plan(this.workoutPlanTrainerIIForm.value)
      .subscribe((res: any) => {
        this.trainer2Response = res;
      });
  }
}
