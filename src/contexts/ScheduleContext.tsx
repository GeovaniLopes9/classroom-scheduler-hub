
import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
  ClassSession, 
  ScheduleContextType, 
  ScheduleState, 
  ClassGroup, 
  TimeSlot, 
  DayOfWeek 
} from '../utils/types';
import { getInitialScheduleData } from '../utils/initialData';
import { toast } from 'sonner';

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

export const ScheduleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [schedule, setSchedule] = useState<ScheduleState>(getInitialScheduleData());

  // Save to localStorage whenever schedule changes
  useEffect(() => {
    localStorage.setItem('scheduleData', JSON.stringify(schedule));
  }, [schedule]);

  const addClass = (newClass: Omit<ClassSession, 'id'>) => {
    setSchedule(prev => {
      const updatedClasses = [...prev.classes, { ...newClass, id: uuidv4() }];
      toast.success('Aula adicionada com sucesso');
      return { ...prev, classes: updatedClasses };
    });
  };

  const updateClass = (id: string, updatedClass: Partial<ClassSession>) => {
    setSchedule(prev => {
      const updatedClasses = prev.classes.map(c => 
        c.id === id ? { ...c, ...updatedClass } : c
      );
      toast.success('Aula atualizada com sucesso');
      return { ...prev, classes: updatedClasses };
    });
  };

  const removeClass = (id: string) => {
    setSchedule(prev => {
      const updatedClasses = prev.classes.filter(c => c.id !== id);
      toast.success('Aula removida com sucesso');
      return { ...prev, classes: updatedClasses };
    });
  };

  const setCurrentDay = (day: DayOfWeek) => {
    setSchedule(prev => ({ ...prev, currentDay: day }));
  };

  const updateClassColor = (classGroup: ClassGroup, color: string) => {
    setSchedule(prev => {
      const updatedColors = { ...prev.classColors, [classGroup]: color };
      toast.success(`Cor da turma ${classGroup} atualizada`);
      return { ...prev, classColors: updatedColors };
    });
  };

  const updateTimeSlot = (index: number, updatedSlot: Partial<TimeSlot>) => {
    setSchedule(prev => {
      const updatedTimeSlots = [...prev.timeSlots];
      updatedTimeSlots[index] = { ...updatedTimeSlots[index], ...updatedSlot };
      toast.success('Horário atualizado com sucesso');
      return { ...prev, timeSlots: updatedTimeSlots };
    });
  };

  const value: ScheduleContextType = {
    schedule,
    addClass,
    updateClass,
    removeClass,
    setCurrentDay,
    updateClassColor,
    updateTimeSlot,
  };

  return (
    <ScheduleContext.Provider value={value}>
      {children}
    </ScheduleContext.Provider>
  );
};

export const useSchedule = () => {
  const context = useContext(ScheduleContext);
  if (context === undefined) {
    throw new Error('useSchedule must be used within a ScheduleProvider');
  }
  return context;
};
