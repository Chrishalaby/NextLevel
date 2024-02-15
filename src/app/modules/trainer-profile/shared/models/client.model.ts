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

export interface CreateSessionEventDto {
  sessionsBundleSessionId?: number;
  sessionsBundleId: number;
  startDateTime: Date;
  endDateTime: Date;
  description: string;
  location: string;
}
