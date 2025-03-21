
import React, { useState, useEffect } from 'react';
import { useSchedule } from '../contexts/ScheduleContext';
import DayPanel from './DayPanel';
import LoginForm from './LoginForm';
import { DayOfWeek } from '../utils/types';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import ColorSettings from './ColorSettings';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Layout = () => {
  const { schedule, setCurrentDay, user } = useSchedule();
  const [showSettings, setShowSettings] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(
    localStorage.getItem('backgroundImage')
  );

  const days: DayOfWeek[] = ['segunda', 'terca', 'quarta', 'quinta', 'sexta'];
  const dayNames: Record<DayOfWeek, string> = {
    segunda: 'Segunda-feira',
    terca: 'Terça-feira',
    quarta: 'Quarta-feira',
    quinta: 'Quinta-feira',
    sexta: 'Sexta-feira',
  };

  const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setBackgroundImage(result);
        localStorage.setItem('backgroundImage', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearBackground = () => {
    setBackgroundImage(null);
    localStorage.removeItem('backgroundImage');
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat blur-sm opacity-15"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen px-6 py-10 md:px-8 lg:px-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-light tracking-tight">
              Horários de Aula
            </h1>
            <p className="text-muted-foreground mt-1">
              Planejamento semanal para todas as turmas
            </p>
          </div>

          <div className="flex space-x-2">
            <LoginForm />
            
            {user?.isAdmin && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Settings size={16} /> Configurações
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Configurações</SheetTitle>
                  </SheetHeader>
                  <div className="py-6 space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Imagem de fundo</h3>
                      <div className="flex flex-col space-y-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleBackgroundChange}
                          className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-primary/90"
                        />
                        {backgroundImage && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={clearBackground}
                            className="mt-2"
                          >
                            Remover imagem de fundo
                          </Button>
                        )}
                      </div>
                    </div>
                    <ColorSettings />
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </header>

        <div className="mb-8 overflow-x-auto">
          <nav className="flex space-x-1 border-b">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setCurrentDay(day)}
                className={`px-4 py-2 font-medium text-sm rounded-t-md transition-colors relative ${
                  schedule.currentDay === day
                    ? 'text-primary bg-background'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {dayNames[day]}
                {schedule.currentDay === day && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    layoutId="activeDay"
                    initial={false}
                  />
                )}
              </button>
            ))}
          </nav>
        </div>

        <main className="pb-20">
          <motion.div
            key={schedule.currentDay}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <DayPanel day={schedule.currentDay} />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
