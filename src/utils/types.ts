
export type ClassGroup = '1A' | '1B' | '1C' | '1D' | '2A' | '2B' | '2C' | '3A' | '3B';

export type TimeSlot = {
  start: string;
  end: string;
  isBreak?: boolean;
  breakName?: string;
};

export interface ClassSession {
  id: string;
  classGroup: ClassGroup;
  teacher: string;
  subject: string;
  room: string;
  timeSlot: string;
  day: DayOfWeek;
  color?: string;
}

export type DayOfWeek = 'segunda' | 'terca' | 'quarta' | 'quinta' | 'sexta';

export interface ScheduleState {
  classes: ClassSession[];
  timeSlots: TimeSlot[];
  classColors: Record<ClassGroup, string>;
  currentDay: DayOfWeek;
}

export interface ScheduleContextType {
  schedule: ScheduleState;
  addClass: (newClass: Omit<ClassSession, 'id'>) => void;
  updateClass: (id: string, updatedClass: Partial<ClassSession>) => void;
  removeClass: (id: string) => void;
  setCurrentDay: (day: DayOfWeek) => void;
  updateClassColor: (classGroup: ClassGroup, color: string) => void;
  updateTimeSlot: (index: number, updatedSlot: Partial<TimeSlot>) => void;
}
