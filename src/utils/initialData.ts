
import { ClassSession, ScheduleState, TimeSlot, DayOfWeek, ClassGroup } from './types';

// Default time slots with breaks
export const defaultTimeSlots: TimeSlot[] = [
  { start: '07:30', end: '08:20' },
  { start: '08:20', end: '09:10' },
  { isBreak: true, breakName: 'Lanche', start: '09:10', end: '09:25' },
  { start: '09:25', end: '10:15' },
  { start: '10:15', end: '11:05' },
  { start: '11:05', end: '11:55' },
  { isBreak: true, breakName: 'Almoço', start: '11:55', end: '13:25' },
  { start: '13:25', end: '14:15' },
  { start: '14:15', end: '15:05' },
  { isBreak: true, breakName: 'Lanche', start: '15:05', end: '15:20' },
  { start: '15:20', end: '16:10' },
  { start: '16:10', end: '17:00' },
];

// Default colors for each class
export const defaultClassColors: Record<ClassGroup, string> = {
  '1A': '#F8E3E7', // Soft pink
  '1B': '#E3F8E3', // Soft green
  '1C': '#E3E3F8', // Soft blue
  '1D': '#F8F8E3', // Soft yellow
  '2A': '#F8E3F8', // Soft purple
  '2B': '#E3F8F8', // Soft cyan
  '2C': '#F8E8E3', // Soft orange
  '3A': '#E8F8E3', // Soft mint
  '3B': '#E3E8F8', // Soft lavender
};

// Parse a schedule data from local storage or use default
export const getInitialScheduleData = (): ScheduleState => {
  const storedData = localStorage.getItem('scheduleData');
  if (storedData) {
    try {
      return JSON.parse(storedData);
    } catch (error) {
      console.error('Failed to parse stored schedule data:', error);
    }
  }

  return {
    classes: getInitialClasses(),
    timeSlots: defaultTimeSlots,
    classColors: defaultClassColors,
    currentDay: getCurrentDayOfWeek(),
  };
};

// Get current day of week in Portuguese
export const getCurrentDayOfWeek = (): DayOfWeek => {
  const days: DayOfWeek[] = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'] as DayOfWeek[];
  const today = new Date().getDay();
  // Default to Monday if weekend
  return today === 0 || today === 6 ? 'segunda' : days[today];
};

// Initialize with data from tables
export const getInitialClasses = (): ClassSession[] => {
  return [
    // Monday (Segunda-feira)
    { id: 'm1', classGroup: '1D', teacher: '', subject: '', room: '', timeSlot: '07:30 - 08:20', day: 'segunda' },
    { id: 'm2', classGroup: '1D', teacher: '', subject: '', room: '', timeSlot: '08:20 - 09:10', day: 'segunda' },
    { id: 'm3', classGroup: '1D', teacher: 'Henrique', subject: 'Front-End', room: '', timeSlot: '10:15 - 11:05', day: 'segunda' },
    { id: 'm4', classGroup: '1D', teacher: 'Henrique', subject: 'Front-End', room: '', timeSlot: '11:05 - 11:55', day: 'segunda' },
    { id: 'm5', classGroup: '2A', teacher: 'Johnattan', subject: 'Back-End', room: '', timeSlot: '10:15 - 11:05', day: 'segunda' },
    { id: 'm6', classGroup: '2A', teacher: 'Johnattan', subject: 'Back-End', room: '', timeSlot: '11:05 - 11:55', day: 'segunda' },
    { id: 'm7', classGroup: '2B', teacher: 'Edgar', subject: 'Back-End', room: '', timeSlot: '10:15 - 11:05', day: 'segunda' },
    { id: 'm8', classGroup: '2B', teacher: 'Edgar', subject: 'Back-End', room: '', timeSlot: '11:05 - 11:55', day: 'segunda' },
    { id: 'm9', classGroup: '2C', teacher: 'Juliana', subject: 'Prát. Prof. 2', room: '', timeSlot: '10:15 - 11:05', day: 'segunda' },
    { id: 'm10', classGroup: '2C', teacher: 'Emily', subject: 'Framework', room: '', timeSlot: '11:05 - 11:55', day: 'segunda' },
    
    // Tuesday (Terça-feira)
    { id: 't1', classGroup: '1A', teacher: 'Emily', subject: 'Tec. Log. Soc.', room: '', timeSlot: '10:15 - 11:05', day: 'terca' },
    { id: 't2', classGroup: '1A', teacher: 'Emily', subject: 'UX/UI', room: '', timeSlot: '11:05 - 11:55', day: 'terca' },
    { id: 't3', classGroup: '1A', teacher: 'Johnattan', subject: 'Front-End', room: '', timeSlot: '13:25 - 14:15', day: 'terca' },
    { id: 't4', classGroup: '1A', teacher: 'Johnattan', subject: 'Front-End', room: '', timeSlot: '14:15 - 15:05', day: 'terca' },
    { id: 't5', classGroup: '1A', teacher: 'Johnattan', subject: 'Front-End', room: '', timeSlot: '15:20 - 16:10', day: 'terca' },
    { id: 't6', classGroup: '1A', teacher: 'Johnattan', subject: 'Front-End', room: '', timeSlot: '16:10 - 17:00', day: 'terca' },
    { id: 't7', classGroup: '1B', teacher: 'Johnattan', subject: 'Front-End', room: '', timeSlot: '10:15 - 11:05', day: 'terca' },
    { id: 't8', classGroup: '1B', teacher: 'Johnattan', subject: 'Front-End', room: '', timeSlot: '11:05 - 11:55', day: 'terca' },
    { id: 't9', classGroup: '1B', teacher: 'Maurizio', subject: 'Front-End', room: '', timeSlot: '13:25 - 14:15', day: 'terca' },
    { id: 't10', classGroup: '1B', teacher: 'Maurizio', subject: 'Front-End', room: '', timeSlot: '14:15 - 15:05', day: 'terca' },
    { id: 't11', classGroup: '1B', teacher: 'Maurizio', subject: 'Front-End', room: '', timeSlot: '15:20 - 16:10', day: 'terca' },
    { id: 't12', classGroup: '1B', teacher: 'Maurizio', subject: 'Front-End', room: '', timeSlot: '16:10 - 17:00', day: 'terca' },
    { id: 't13', classGroup: '1C', teacher: 'Maurizio', subject: 'Front-End', room: '', timeSlot: '10:15 - 11:05', day: 'terca' },
    { id: 't14', classGroup: '1C', teacher: 'Maurizio', subject: 'Front-End', room: '', timeSlot: '11:05 - 11:55', day: 'terca' },
    { id: 't15', classGroup: '1C', teacher: 'Henrique', subject: 'Front-End', room: '', timeSlot: '13:25 - 14:15', day: 'terca' },
    { id: 't16', classGroup: '1C', teacher: 'Henrique', subject: 'Front-End', room: '', timeSlot: '14:15 - 15:05', day: 'terca' },
    { id: 't17', classGroup: '1C', teacher: 'Henrique', subject: 'Front-End', room: '', timeSlot: '15:20 - 16:10', day: 'terca' },
    { id: 't18', classGroup: '1C', teacher: 'Henrique', subject: 'Front-End', room: '', timeSlot: '16:10 - 17:00', day: 'terca' },
    { id: 't19', classGroup: '1D', teacher: 'Edgar', subject: 'Back-End', room: '', timeSlot: '10:15 - 11:05', day: 'terca' },
    { id: 't20', classGroup: '1D', teacher: 'Edgar', subject: 'Back-End', room: '', timeSlot: '11:05 - 11:55', day: 'terca' },
    { id: 't21', classGroup: '2A', teacher: 'Karla', subject: 'Proj. Integ 2', room: '', timeSlot: '13:25 - 14:15', day: 'terca' },
    { id: 't22', classGroup: '2A', teacher: 'Karla', subject: 'Proj. Integ 2', room: '', timeSlot: '14:15 - 15:05', day: 'terca' },
    { id: 't23', classGroup: '2A', teacher: 'Emily', subject: 'Framework', room: '', timeSlot: '15:20 - 16:10', day: 'terca' },
    { id: 't24', classGroup: '2A', teacher: 'Emily', subject: 'Framework', room: '', timeSlot: '16:10 - 17:00', day: 'terca' },
    { id: 't25', classGroup: '2B', teacher: 'Emily', subject: 'Framework', room: '', timeSlot: '13:25 - 14:15', day: 'terca' },
    { id: 't26', classGroup: '2B', teacher: 'Emily', subject: 'Framework', room: '', timeSlot: '14:15 - 15:05', day: 'terca' },
    { id: 't27', classGroup: '2B', teacher: 'Karla', subject: 'Prát. Prof 1', room: '', timeSlot: '15:20 - 16:10', day: 'terca' },
    { id: 't28', classGroup: '2B', teacher: 'Karla', subject: 'Proj. Integ 2', room: '', timeSlot: '16:10 - 17:00', day: 'terca' },
    
    // Wednesday (Quarta-feira)
    { id: 'w1', classGroup: '1A', teacher: 'Débora', subject: 'Proj. Integ 1', room: '', timeSlot: '09:25 - 10:15', day: 'quarta' },
    { id: 'w2', classGroup: '1A', teacher: 'Henrique', subject: 'Front-End', room: '', timeSlot: '11:05 - 11:55', day: 'quarta' },
    { id: 'w3', classGroup: '1A', teacher: 'Karla', subject: 'Prát. Prof 1', room: '', timeSlot: '13:25 - 14:15', day: 'quarta' },
    { id: 'w4', classGroup: '1A', teacher: 'Karla', subject: 'Prát. Prof 1', room: '', timeSlot: '14:15 - 15:05', day: 'quarta' },
    { id: 'w5', classGroup: '1A', teacher: 'Emily', subject: 'Tec. Log. Soc.', room: '', timeSlot: '15:20 - 16:10', day: 'quarta' },
    { id: 'w6', classGroup: '1A', teacher: 'Emily', subject: 'UX/UI', room: '', timeSlot: '16:10 - 17:00', day: 'quarta' },
    { id: 'w7', classGroup: '1B', teacher: 'Johnattan', subject: 'Back-End', room: '', timeSlot: '09:25 - 10:15', day: 'quarta' },
    { id: 'w8', classGroup: '1B', teacher: 'Henrique', subject: 'Front-End', room: '', timeSlot: '10:15 - 11:05', day: 'quarta' },
    { id: 'w9', classGroup: '1B', teacher: 'Johnattan', subject: 'Back-End', room: '', timeSlot: '11:05 - 11:55', day: 'quarta' },
    { id: 'w10', classGroup: '1B', teacher: 'Débora', subject: 'Proj. Integ 1', room: '', timeSlot: '13:25 - 14:15', day: 'quarta' },
    { id: 'w11', classGroup: '1B', teacher: 'Emily', subject: 'UX/UI', room: '', timeSlot: '14:15 - 15:05', day: 'quarta' },
    { id: 'w12', classGroup: '1B', teacher: 'Maurizio', subject: 'Front-End', room: '', timeSlot: '15:20 - 16:10', day: 'quarta' },
    { id: 'w13', classGroup: '1B', teacher: 'Maurizio', subject: 'Front-End', room: '', timeSlot: '16:10 - 17:00', day: 'quarta' },
    { id: 'w14', classGroup: '1C', teacher: 'Juliana', subject: 'Prát. Prof. 2', room: '', timeSlot: '09:25 - 10:15', day: 'quarta' },
    { id: 'w15', classGroup: '1C', teacher: 'Johnattan', subject: 'Back-End', room: '', timeSlot: '10:15 - 11:05', day: 'quarta' },
    { id: 'w16', classGroup: '1C', teacher: 'Débora', subject: 'Proj. Integ 2', room: '', timeSlot: '11:05 - 11:55', day: 'quarta' },
    { id: 'w17', classGroup: '1C', teacher: 'Henrique', subject: 'Front-End', room: '', timeSlot: '13:25 - 14:15', day: 'quarta' },
    { id: 'w18', classGroup: '1C', teacher: 'Henrique', subject: 'Front-End', room: '', timeSlot: '14:15 - 15:05', day: 'quarta' },
    { id: 'w19', classGroup: '1C', teacher: 'Henrique', subject: 'Front-End', room: '', timeSlot: '15:20 - 16:10', day: 'quarta' },
    { id: 'w20', classGroup: '1C', teacher: 'Débora', subject: 'Proj. Integ 1', room: '', timeSlot: '16:10 - 17:00', day: 'quarta' },
    { id: 'w21', classGroup: '1D', teacher: 'Edgar', subject: 'Back-End', room: '', timeSlot: '09:25 - 10:15', day: 'quarta' },
    { id: 'w22', classGroup: '1D', teacher: 'Débora', subject: 'Proj. Integ 2', room: '', timeSlot: '10:15 - 11:05', day: 'quarta' },
    { id: 'w23', classGroup: '1D', teacher: 'Edgar', subject: 'Back-End', room: '', timeSlot: '11:05 - 11:55', day: 'quarta' },
    { id: 'w24', classGroup: '2A', teacher: 'Edgar', subject: 'Back-End', room: '', timeSlot: '10:15 - 11:05', day: 'quarta' },
    { id: 'w25', classGroup: '2A', teacher: 'Johnattan', subject: 'Front-End', room: '', timeSlot: '13:25 - 14:15', day: 'quarta' },
    { id: 'w26', classGroup: '2A', teacher: 'Johnattan', subject: 'Front-End', room: '', timeSlot: '14:15 - 15:05', day: 'quarta' },
    { id: 'w27', classGroup: '2A', teacher: 'Johnattan', subject: 'Front-End', room: '', timeSlot: '15:20 - 16:10', day: 'quarta' },
    { id: 'w28', classGroup: '2A', teacher: 'Johnattan', subject: 'Front-End', room: '', timeSlot: '16:10 - 17:00', day: 'quarta' },
    { id: 'w29', classGroup: '2B', teacher: 'Maurizio', subject: 'Back-End', room: '', timeSlot: '13:25 - 14:15', day: 'quarta' },
    { id: 'w30', classGroup: '2B', teacher: 'Maurizio', subject: 'Back-End', room: '', timeSlot: '14:15 - 15:05', day: 'quarta' },
    { id: 'w31', classGroup: '2B', teacher: 'Karla', subject: 'Proj. Integ 2', room: '', timeSlot: '15:20 - 16:10', day: 'quarta' },
    { id: 'w32', classGroup: '2B', teacher: 'Edgar', subject: 'Back-End', room: '', timeSlot: '16:10 - 17:00', day: 'quarta' },
    
    // Thursday (Quinta-feira)
    { id: 'th1', classGroup: '1A', teacher: 'Juliana', subject: 'Prát. Prof. 1', room: '', timeSlot: '10:15 - 11:05', day: 'quinta' },
    { id: 'th2', classGroup: '1A', teacher: 'Juliana', subject: 'Prát. Prof. 1', room: '', timeSlot: '11:05 - 11:55', day: 'quinta' },
    { id: 'th3', classGroup: '1A', teacher: 'Henrique', subject: 'Front-End', room: '', timeSlot: '13:25 - 14:15', day: 'quinta' },
    { id: 'th4', classGroup: '1B', teacher: 'Débora', subject: 'Proj. Integ 2', room: '', timeSlot: '10:15 - 11:05', day: 'quinta' },
    { id: 'th5', classGroup: '1B', teacher: 'Karla', subject: 'Prát. Prof 1', room: '', timeSlot: '11:05 - 11:55', day: 'quinta' },
    { id: 'th6', classGroup: '1B', teacher: 'Maurizio', subject: 'Front-End', room: '', timeSlot: '13:25 - 14:15', day: 'quinta' },
    { id: 'th7', classGroup: '1C', teacher: 'Emily', subject: 'Framework', room: '', timeSlot: '10:15 - 11:05', day: 'quinta' },
    { id: 'th8', classGroup: '1C', teacher: 'Emily', subject: 'Framework', room: '', timeSlot: '11:05 - 11:55', day: 'quinta' },
    { id: 'th9', classGroup: '1C', teacher: 'Emily', subject: 'Tec. Log. Soc.', room: '', timeSlot: '13:25 - 14:15', day: 'quinta' },
    { id: 'th10', classGroup: '1D', teacher: 'Edgar', subject: 'Back-End', room: '', timeSlot: '10:15 - 11:05', day: 'quinta' },
    { id: 'th11', classGroup: '1D', teacher: 'Edgar', subject: 'Back-End', room: '', timeSlot: '11:05 - 11:55', day: 'quinta' },
    { id: 'th12', classGroup: '2A', teacher: 'Karla', subject: 'Prát. Prof 1', room: '', timeSlot: '13:25 - 14:15', day: 'quinta' },
    { id: 'th13', classGroup: '2B', teacher: 'Edgar', subject: 'Back-End', room: '', timeSlot: '13:25 - 14:15', day: 'quinta' },
  ];
};
