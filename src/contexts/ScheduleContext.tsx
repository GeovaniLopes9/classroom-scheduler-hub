
import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
  ClassSession, 
  ScheduleContextType, 
  ScheduleState, 
  ClassGroup, 
  TimeSlot, 
  DayOfWeek,
  User
} from '../utils/types';
import { getInitialScheduleData } from '../utils/initialData';
import { toast } from 'sonner';

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

export const ScheduleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [schedule, setSchedule] = useState<ScheduleState>(() => {
    // Try to load from localStorage first
    const savedData = localStorage.getItem('scheduleData');
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        console.error('Error parsing saved schedule data:', error);
        return getInitialScheduleData();
      }
    }
    return getInitialScheduleData();
  });

  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('scheduleUser');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        return null;
      }
    }
    return null;
  });

  // Save to localStorage whenever schedule changes
  useEffect(() => {
    localStorage.setItem('scheduleData', JSON.stringify(schedule));
  }, [schedule]);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('scheduleUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('scheduleUser');
    }
  }, [user]);

  const login = (username: string, password: string): boolean => {
    // For demonstration purposes, hardcoded admin credentials
    // In a real application, this should be authenticated against a secure database
    if (username === 'admin' && password === 'admin123') {
      setUser({ username, isAdmin: true });
      toast.success('Login realizado com sucesso!');
      return true;
    }
    toast.error('Credenciais inválidas');
    return false;
  };

  const logout = () => {
    setUser(null);
    toast.success('Logout realizado com sucesso!');
  };

  const addClass = (newClass: Omit<ClassSession, 'id'>) => {
    if (!user?.isAdmin) {
      toast.error('Apenas administradores podem adicionar aulas');
      return;
    }
    
    setSchedule(prev => {
      // If no color is specified, use the class group's color or generate a vibrant one
      const classColor = newClass.color || prev.classColors[newClass.classGroup];
      const newClassWithId = { ...newClass, id: uuidv4(), color: classColor };
      const updatedClasses = [...prev.classes, newClassWithId];
      toast.success('Aula adicionada com sucesso');
      return { ...prev, classes: updatedClasses };
    });
  };

  const updateClass = (id: string, updatedClass: Partial<ClassSession>) => {
    if (!user?.isAdmin) {
      toast.error('Apenas administradores podem atualizar aulas');
      return;
    }
    
    setSchedule(prev => {
      const updatedClasses = prev.classes.map(c => 
        c.id === id ? { ...c, ...updatedClass } : c
      );
      toast.success('Aula atualizada com sucesso');
      return { ...prev, classes: updatedClasses };
    });
  };

  const removeClass = (id: string) => {
    if (!user?.isAdmin) {
      toast.error('Apenas administradores podem remover aulas');
      return;
    }
    
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
    if (!user?.isAdmin) {
      toast.error('Apenas administradores podem atualizar cores');
      return;
    }
    
    setSchedule(prev => {
      const updatedColors = { ...prev.classColors, [classGroup]: color };
      toast.success(`Cor da turma ${classGroup} atualizada`);
      return { ...prev, classColors: updatedColors };
    });
  };

  const updateTimeSlot = (index: number, updatedSlot: Partial<TimeSlot>) => {
    if (!user?.isAdmin) {
      toast.error('Apenas administradores podem atualizar horários');
      return;
    }
    
    setSchedule(prev => {
      const updatedTimeSlots = [...prev.timeSlots];
      updatedTimeSlots[index] = { ...updatedTimeSlots[index], ...updatedSlot };
      toast.success('Horário atualizado com sucesso');
      return { ...prev, timeSlots: updatedTimeSlots };
    });
  };

  const addTimeSlot = (newSlot: TimeSlot) => {
    if (!user?.isAdmin) {
      toast.error('Apenas administradores podem adicionar horários');
      return;
    }
    
    setSchedule(prev => {
      const updatedTimeSlots = [...prev.timeSlots, newSlot];
      // Sort time slots by start time
      updatedTimeSlots.sort((a, b) => {
        const timeA = a.start.split(':').map(Number);
        const timeB = b.start.split(':').map(Number);
        return (timeA[0] * 60 + timeA[1]) - (timeB[0] * 60 + timeB[1]);
      });
      toast.success('Novo horário adicionado com sucesso');
      return { ...prev, timeSlots: updatedTimeSlots };
    });
  };

  const removeTimeSlot = (index: number) => {
    if (!user?.isAdmin) {
      toast.error('Apenas administradores podem remover horários');
      return;
    }
    
    setSchedule(prev => {
      const updatedTimeSlots = [...prev.timeSlots];
      updatedTimeSlots.splice(index, 1);
      toast.success('Horário removido com sucesso');
      return { ...prev, timeSlots: updatedTimeSlots };
    });
  };

  const value: ScheduleContextType = {
    schedule,
    user,
    login,
    logout,
    addClass,
    updateClass,
    removeClass,
    setCurrentDay,
    updateClassColor,
    updateTimeSlot,
    addTimeSlot,
    removeTimeSlot,
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
