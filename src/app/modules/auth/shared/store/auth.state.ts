import { JwtData } from 'src/app/shared/models/jwt-data.model';

export interface AuthState {
  authPending: boolean;
  user: JwtData | null;
}
