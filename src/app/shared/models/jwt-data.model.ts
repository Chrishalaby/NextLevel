export interface JwtData {
  username: string;
  email: string;
  avatar: string;
  firstName: string;
  lastName: string;
  id: number;
  expiryDate: Date;
  exp?: number;
}
