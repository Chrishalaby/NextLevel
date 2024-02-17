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
export interface Bundle {
  id: number;
  sessionsNumber: number;
  totalPrice: number;
  description: string;
  done: boolean;
  remainingSessions: number;
  sessionEvents: SessionEvent[];
  ghostClient: Client;
}

export interface SessionEvent {
  id: number;
  done: boolean;
  startDateTime: Date;
  endDateTime: Date;
  description: string;
  location: string;
}

export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  isGhost: boolean;
}
