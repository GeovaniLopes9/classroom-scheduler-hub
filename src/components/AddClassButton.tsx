
import React, { useState } from 'react';
import { useSchedule } from '../contexts/ScheduleContext';
import { ClassGroup, DayOfWeek } from '../utils/types';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AddClassButtonProps {
  classGroup: ClassGroup;
  day: DayOfWeek;
}

const AddClassButton: React.FC<AddClassButtonProps> = ({ classGroup, day }) => {
  const { addClass, schedule } = useSchedule();
  const [open, setOpen] = useState(false);
  const [newClass, setNewClass] = useState({
    teacher: '',
    subject: '',
    room: '',
    timeSlot: '',
  });

  const nonBreakTimeSlots = schedule.timeSlots.filter(slot => !slot.isBreak);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewClass(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectTimeSlot = (value: string) => {
    setNewClass(prev => ({ ...prev, timeSlot: value }));
  };

  const handleAddClass = () => {
    addClass({
      ...newClass,
      classGroup,
      day,
    });
    setNewClass({
      teacher: '',
      subject: '',
      room: '',
      timeSlot: '',
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
          <Plus size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Aula - {classGroup}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="teacher">Professor</Label>
              <Input
                id="teacher"
                name="teacher"
                value={newClass.teacher}
                onChange={handleInputChange}
                placeholder="Nome do professor"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">Matéria</Label>
              <Input
                id="subject"
                name="subject"
                value={newClass.subject}
                onChange={handleInputChange}
                placeholder="Nome da matéria"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="room">Sala</Label>
              <Input
                id="room"
                name="room"
                value={newClass.room}
                onChange={handleInputChange}
                placeholder="Número da sala"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timeSlot">Horário</Label>
              <Select onValueChange={handleSelectTimeSlot}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o horário" />
                </SelectTrigger>
                <SelectContent>
                  {nonBreakTimeSlots.map((slot, index) => (
                    <SelectItem key={index} value={`${slot.start} - ${slot.end}`}>
                      {slot.start} - {slot.end}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={handleAddClass}>Adicionar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddClassButton;
