
import React from 'react';
import { useSchedule } from '../contexts/ScheduleContext';
import { ClassGroup } from '../utils/types';
import { Label } from '@/components/ui/label';

const ColorSettings = () => {
  const { schedule, updateClassColor } = useSchedule();
  
  const allClasses: ClassGroup[] = ['1A', '1B', '1C', '1D', '2A', '2B', '2C', '3A', '3B'];

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Cores das Turmas</h3>
      <div className="grid grid-cols-2 gap-4">
        {allClasses.map((classGroup) => (
          <div key={classGroup} className="space-y-2">
            <div className="flex items-center gap-2">
              <div 
                className="w-5 h-5 rounded-full" 
                style={{ backgroundColor: schedule.classColors[classGroup] }}
              />
              <Label htmlFor={`color-${classGroup}`}>{classGroup}</Label>
            </div>
            <input
              id={`color-${classGroup}`}
              type="color"
              value={schedule.classColors[classGroup]}
              onChange={(e) => updateClassColor(classGroup, e.target.value)}
              className="w-full h-8 rounded-md cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorSettings;
