export interface JwtData {
  username: string;
  email: string;
  avatar: string;
  firstName: string;
  lastName: string;
  id: number;
  sub: number;
  expiryDate: Date;
  exp?: number;
}
