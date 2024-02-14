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

export interface clientBundle {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  isGhost: boolean;
}

export interface CreateBundleDto {
  clientId: number;
  sessionsNumber: number;
  totalPrice: number;
  description: string;
}
