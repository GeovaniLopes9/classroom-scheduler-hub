
import React from 'react';
import { useSchedule } from '../contexts/ScheduleContext';
import { DayOfWeek, ClassGroup, TimeSlot } from '../utils/types';
import ClassCard from './ClassCard';
import AddClassButton from './AddClassButton';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface DayPanelProps {
  day: DayOfWeek;
}

const DayPanel: React.FC<DayPanelProps> = ({ day }) => {
  const { schedule } = useSchedule();
  const { classes, timeSlots, classColors } = schedule;

  const dayClasses = classes.filter(c => c.day === day);
  const allClassGroups: ClassGroup[] = ['1A', '1B', '1C', '1D', '2A', '2B', '2C', '3A', '3B'];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  // Group classes by time slot
  const classesByTimeSlot = timeSlots.reduce((acc, slot) => {
    if (slot.isBreak) return acc;
    
    const timeSlotFormatted = `${slot.start} - ${slot.end}`;
    const classesInTimeSlot = dayClasses.filter(c => c.timeSlot === timeSlotFormatted);
    
    acc[timeSlotFormatted] = classesInTimeSlot;
    return acc;
  }, {} as Record<string, typeof dayClasses>);

  return (
    <div className="overflow-auto pb-10">
      <div className="mt-6 mb-10">
        <h3 className="text-xl font-medium mb-4">Turmas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {allClassGroups.map((classGroup) => (
            <motion.div 
              key={classGroup}
              variants={item}
              className="flex items-center justify-between p-3 rounded-lg border shadow-sm"
              style={{ backgroundColor: `${classColors[classGroup]}40` }}
            >
              <span className="text-sm font-medium">{classGroup}</span>
              <AddClassButton classGroup={classGroup} day={day} />
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-xl font-medium mb-4">Horários do Dia</h3>
        <motion.div 
          className="grid gap-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {timeSlots.map((slot, index) => (
            <motion.div 
              key={index}
              variants={item}
              className={`relative p-4 rounded-lg ${
                slot.isBreak 
                  ? 'bg-primary/10 border border-primary/20' 
                  : 'bg-card shadow-sm border'
              }`}
            >
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium flex items-center">
                    {slot.isBreak ? (
                      <span className="text-primary font-semibold">{slot.breakName}</span>
                    ) : (
                      <span className="flex items-center">
                        <Clock size={16} className="mr-2 text-primary" />
                        <span>Aula</span>
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-bold bg-secondary py-1 px-3 rounded-full">
                    {slot.start} - {slot.end}
                  </div>
                </div>
                
                {!slot.isBreak && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-2">
                    {classesByTimeSlot[`${slot.start} - ${slot.end}`]?.map((classSession) => (
                      <ClassCard
                        key={classSession.id}
                        classSession={classSession}
                        // Use the class group color as a default, but individual class color if available
                        color={classSession.color || classColors[classSession.classGroup]}
                      />
                    ))}
                    
                    {/* Show empty state if no classes in this time slot */}
                    {(!classesByTimeSlot[`${slot.start} - ${slot.end}`] || 
                      classesByTimeSlot[`${slot.start} - ${slot.end}`].length === 0) && (
                      <div className="text-center p-4 text-muted-foreground text-sm border border-dashed rounded-lg">
                        Nenhuma aula neste horário
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default DayPanel;
