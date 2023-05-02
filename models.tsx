export interface Inputs {
  date: string;
  from: string;
  to: string;
}

export interface ISchedule {
  date: string;
  from: string;
  to: string;
}

export interface IUserInfo {
  id: number;
  name: string;
}

export interface IAvailableSlots {
  slotId: number;
  providerId: number;
  date: string;
  from: string;
  to: string;
}

export interface ISelectedSlots extends IAvailableSlots {
  selectedTime: Date;
  isConfirmed: boolean;
}
