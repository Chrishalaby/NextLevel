export enum ModuleRoutes {
  Auth = 'auth',
  TrainerProfile = 'trainer-profile',
  nutritionalGuidance = 'nutritional-guidance',
  WorkoutPlan = 'workout-plan',
}

export enum AuthRoutes {
  Empty = '',
  Login = 'login',
  AccessDenied = 'access-denied',
  Error = 'error',
  ForgotPassword = 'forgot-password',
  LockScreen = 'lock-screen',
  NewPassword = 'new-password',
  Register = 'register',
  Verification = 'verification',
}

export enum TrainerProfileRoutes {
  Empty = '',
  CreateAboutUs = 'create-aboutus',
  ShowAboutUs = 'show-aboutus',
}

export enum NutritionalGuidanceRoutes {
  Empty = '',
  MealPlan = 'meal-plan',
}

export enum WorkoutPlanRoutes {
  Empty = '',
  AiCustomWorkout = 'ai-custom-workout',
}
