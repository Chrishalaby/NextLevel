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
import { MultiSelectModule } from 'primeng/multiselect';
import { TabViewModule } from 'primeng/tabview';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TooltipModule } from 'primeng/tooltip';

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
  ],
})
export class AiCustomWorkoutComponent implements OnInit {
  workoutPlanTrainerIForm!: FormGroup;
  workoutPlanTrainerIIForm!: FormGroup;

  selectedGoal: any;
  fitnessGoals: any[] = [
    {
      label: 'Muscle Gain',
      value: 'Muscle Gain',
      info: 'Building muscle mass through resistance training',
    },
    {
      label: 'Weight Loss',
      value: 'Weight Loss',
      info: 'Reducing body weight through a combination of exercise and diet',
    },
    {
      label: 'Fat Loss',
      value: 'Fat Loss',
      info: 'Specifically targeting the reduction of body fat percentage',
    },
    {
      label: 'Strength Increase',
      value: 'Strength Increase',
      info: 'Focusing on increasing the amount of weight one can lift or resistance they can overcome',
    },
    {
      label: 'Endurance Training',
      value: 'Endurance Training',
      info: 'Building stamina and the ability to sustain prolonged physical activity, especially in cardiorespiratory exercises like running or cycling',
    },
    {
      label: 'Flexibility and Mobility',
      value: 'Flexibility and Mobility',
      info: 'Increasing range of motion in the joints and muscles',
    },
    {
      label: 'Cardiovascular Health',
      value: 'Cardiovascular Health',
      info: 'Improving heart health through aerobic exercises',
    },
    {
      label: 'Sports Performance',
      value: 'Sports Performance',
      info: 'Training to improve performance in a specific sport, like football, basketball, swimming, etc',
    },
    {
      label: 'Injury Rehabilitation',
      value: 'Injury Rehabilitation',
      info: 'Recovering from an injury through physical therapy and exercises',
    },
    {
      label: 'Toning and Sculpting',
      value: 'Toning and Sculpting',
      info: 'Defining muscles without significantly increasing muscle size',
    },
    {
      label: 'Functional Fitness',
      value: 'Functional Fitness',
      info: 'Training to make everyday activities easier and reduce the risk of injury',
    },
    {
      label: 'Stress Relief and Mental Health',
      value: 'Stress Relief and Mental Health',
      info: 'Using exercise as a means to relieve stress and improve mental wellbeing',
    },
    {
      label: 'Posture Correction',
      value: 'Posture Correction',
      info: 'Strengthening the muscles that support posture',
    },
    {
      label: 'Balance and Stability',
      value: 'Balance and Stability',
      info: 'Enhancing control over body movements and improving balance',
    },
    {
      label: 'Speed and Agility',
      value: 'Speed and Agility',
      info: 'Improving speed and the ability to change direction quickly',
    },
    {
      label: 'Bone Health',
      value: 'Bone Health',
      info: 'Engaging in weight-bearing exercises to strengthen bones and prevent osteoporosis',
    },
    {
      label: 'General Fitness and Wellbeing',
      value: 'General Fitness and Wellbeing',
      info: 'A broad goal of staying active and maintaining a healthy lifestyle',
    },
    {
      label: 'Body Composition Change',
      value: 'Body Composition Change',
      info: 'Altering the ratio of muscle to fat in the body',
    },
    {
      label: 'Pre/Post-natal Fitness',
      value: 'Pre/Post-natal Fitness',
      info: 'Exercise programs designed for women during or after pregnancy',
    },
    {
      label: 'Aging Gracefully',
      value: 'Aging Gracefully',
      info: 'Focusing on exercises and activities that promote longevity and maintaining physical abilities as one ages',
    },
  ];
  daysPerWeek: any[] = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
  ];
  sessionDuration: any[] = [
    { label: '30 minutes', value: '30 minutes' },
    { label: '45 minutes', value: '45 minutes' },
    { label: '60 minutes', value: '60 minutes' },
    { label: '75 minutes', value: '75 minutes' },
    { label: '90 minutes', value: '90 minutes' },
    { label: '105 minutes', value: '105 minutes' },
    { label: '120 minutes', value: '120 minutes' },
  ];
  fitnessLevel: any[] = [
    { label: 'Beginner', value: 'Beginner' },
    { label: 'Intermediate', value: 'Intermediate' },
    { label: 'Advanced', value: 'Advanced' },
  ];
  exercisePreferences: any[] = [
    { label: 'Weightlifting', value: 'Weightlifting' },
    { label: 'Swimming', value: 'Swimming' },
    { label: 'Running', value: 'Running' },
    { label: 'Cycling', value: 'Cycling' },
    { label: 'Rowing', value: 'Rowing' },
    {
      label: 'Cardio Classes (e.g. Zumba, Aerobics)',
      value: 'Cardio Classes (e.g. Zumba, Aerobics)',
    },
    { label: 'Boxing/Kickboxing', value: 'Boxing/Kickboxing' },
    {
      label: 'High-Intensity Interval Training (HIIT)',
      value: 'High-Intensity Interval Training (HIIT)',
    },
    { label: 'Yoga', value: 'Yoga' },
    {
      label: 'Stretching/Flexibility Training',
      value: 'Stretching/Flexibility Training',
    },
    { label: 'Dance', value: 'Dance' },
    { label: 'Bodyweight Exercises', value: 'Bodyweight Exercises' },
    { label: 'Calisthenics', value: 'Calisthenics' },
    { label: 'Martial Arts', value: 'Martial Arts' },
    {
      label: 'Sport-specific Training (e.g. Basketball, Soccer, Tennis)',
      value: 'Sport-specific Training (e.g. Basketball, Soccer, Tennis)',
    },
    { label: 'Rock Climbing', value: 'Rock Climbing' },
    { label: 'Hiking', value: 'Hiking' },
    { label: 'Water Aerobics', value: 'Water Aerobics' },
    { label: 'CrossFit', value: 'CrossFit' },
    { label: 'Functional Fitness', value: 'Functional Fitness' },
    { label: 'TRX Suspension Training', value: 'TRX Suspension Training' },
    { label: 'Indoor Spinning', value: 'Indoor Spinning' },
    { label: 'Circuit Training', value: 'Circuit Training' },
    { label: 'Skateboarding', value: 'Skateboarding' },
    { label: 'Surfing', value: 'Surfing' },
    { label: 'Powerlifting', value: 'Powerlifting' },
    { label: 'Bodybuilding', value: 'Bodybuilding' },
    { label: 'Tai Chi', value: 'Tai Chi' },
    { label: 'Parkour', value: 'Parkour' },
    { label: 'Gymnastics', value: 'Gymnastics' },
  ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createform();
  }

  createform() {
    this.workoutPlanTrainerIIForm = this.formBuilder.group({
      // basic info will probably be fetched from the user's profile on the BACKEND (not the form)
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
      // basic info will probably be fetched from the user's profile on the BACKEND (not the form)
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
}
