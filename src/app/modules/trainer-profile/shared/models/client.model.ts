export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  fullName?: string;
  phoneNumber: string;
  user_id: number;
  bundle_id: number;
  sessionsLeft: number;
  description: string;
}
