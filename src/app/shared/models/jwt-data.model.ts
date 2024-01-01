export interface JwtData {
  username: string;
  email: string;
  avatar: string;
  firstName: string;
  lastName: string;
  userId: number;
  trainerId: number;
  expiryDate: Date;
  exp?: number;
}
