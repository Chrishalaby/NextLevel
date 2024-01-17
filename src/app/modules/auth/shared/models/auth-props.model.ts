import { LogInDetails } from './auth-details.model';

export interface LogInProps {
  logInDetails: LogInDetails;
}

export interface LogInSuccessProps {
  accessToken: string;
  user: User;
}

interface User {
  id: number;
  username: string;
  email: string;
  userType: string;
}
export interface RequestResetPasswordProps {
  email: string;
}

export interface ResetPasswordProps {
  accessToken: string;
  password: string;
}

export interface ResetPasswordSuccessProps {
  accessToken: string;
}
