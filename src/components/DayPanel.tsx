
import React from 'react';
import { useSchedule } from '../contexts/ScheduleContext';
import { DayOfWeek, ClassGroup, TimeSlot } from '../utils/types';
import ClassCard from './ClassCard';
import AddClassButton from './AddClassButton';
import { motion } from 'framer-motion';

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

  return (
    <div className="overflow-auto pb-10">
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allClassGroups.map((classGroup) => (
          <motion.div 
            key={classGroup}
            variants={item}
            initial="hidden"
            animate="show"
            className="relative rounded-xl p-4 glass class-card-shadow"
            style={{ backgroundColor: `${classColors[classGroup]}40` }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-medium">{classGroup}</h3>
              <AddClassButton classGroup={classGroup} day={day} />
            </div>
            
            <div className="space-y-2">
              {dayClasses
                .filter(c => c.classGroup === classGroup)
                .sort((a, b) => {
                  // Extract start times for sorting
                  const aTime = a.timeSlot.split(' - ')[0];
                  const bTime = b.timeSlot.split(' - ')[0];
                  return aTime.localeCompare(bTime);
                })
                .map((classSession) => (
                  <ClassCard
                    key={classSession.id}
                    classSession={classSession}
                    color={classColors[classGroup]}
                  />
                ))}
              
              {/* Empty state */}
              {dayClasses.filter(c => c.classGroup === classGroup).length === 0 && (
                <div className="text-center py-6 text-muted-foreground text-sm">
                  Nenhuma aula programada
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-10">
        <h3 className="text-xl font-medium mb-4">Horários do Dia</h3>
        <motion.div 
          className="grid gap-2"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {timeSlots.map((slot, index) => (
            <motion.div 
              key={index}
              variants={item}
              className={`p-3 rounded-lg ${
                slot.isBreak 
                  ? 'bg-primary/10 border border-primary/20' 
                  : 'bg-card shadow-sm border'
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="font-medium">
                  {slot.isBreak ? (
                    <span className="text-primary">{slot.breakName}</span>
                  ) : (
                    <span>Aula</span>
                  )}
                </div>
                <div className="text-sm">
                  {slot.start} - {slot.end}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default DayPanel;
