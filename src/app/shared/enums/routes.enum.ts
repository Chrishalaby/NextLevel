export enum ModuleRoutes {
  Auth = 'auth',
  TrainerProfile = 'trainer-profile',
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
