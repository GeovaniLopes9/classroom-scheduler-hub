
import React, { useState } from 'react';
import { useSchedule } from '../contexts/ScheduleContext';
import { TimeSlot } from '../utils/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pencil, Plus, Trash2, X, Check, Clock } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

interface TimeSlotEditorProps {
  slot: TimeSlot;
  index: number;
}

const TimeSlotEditor: React.FC<TimeSlotEditorProps> = ({ slot, index }) => {
  const { updateTimeSlot, removeTimeSlot, user } = useSchedule();
  const [isEditing, setIsEditing] = useState(false);
  const [editedSlot, setEditedSlot] = useState<TimeSlot>(slot);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedSlot(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setEditedSlot(prev => ({ 
      ...prev, 
      isBreak: checked,
      breakName: checked ? (prev.breakName || 'Intervalo') : undefined
    }));
  };

  const handleSave = () => {
    // Simple validation for time format
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(editedSlot.start) || !timeRegex.test(editedSlot.end)) {
      toast.error('Formato de horário inválido. Use HH:MM (ex: 08:30)');
      return;
    }

    updateTimeSlot(index, editedSlot);
    setIsEditing(false);
  };

  const handleDelete = () => {
    removeTimeSlot(index);
  };

  // If not an admin or not in editing mode, just show the time slot
  if (!isEditing) {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Clock size={16} className="mr-2 text-primary" />
          <span>
            {slot.start} - {slot.end}
            {slot.isBreak && ` (${slot.breakName})`}
          </span>
        </div>
        {user?.isAdmin && (
          <div className="flex space-x-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={() => setIsEditing(true)}
            >
              <Pencil size={16} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 text-destructive" 
              onClick={handleDelete}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3 p-3 border rounded-md bg-card">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium text-sm">Editar Horário</h4>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 w-7 p-0" 
          onClick={() => setIsEditing(false)}
        >
          <X size={16} />
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label htmlFor="start" className="text-xs">Início</Label>
          <Input
            id="start"
            name="start"
            value={editedSlot.start}
            onChange={handleInputChange}
            placeholder="HH:MM"
            className="h-8"
          />
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="end" className="text-xs">Fim</Label>
          <Input
            id="end"
            name="end"
            value={editedSlot.end}
            onChange={handleInputChange}
            placeholder="HH:MM"
            className="h-8"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          checked={editedSlot.isBreak || false}
          onCheckedChange={handleSwitchChange}
          id="is-break"
        />
        <Label htmlFor="is-break" className="text-sm">Intervalo/Refeição</Label>
      </div>
      
      {editedSlot.isBreak && (
        <div className="space-y-1">
          <Label htmlFor="breakName" className="text-xs">Nome do Intervalo</Label>
          <Input
            id="breakName"
            name="breakName"
            value={editedSlot.breakName || ''}
            onChange={handleInputChange}
            placeholder="Ex: Lanche da Manhã"
            className="h-8"
          />
        </div>
      )}
      
      <div className="flex justify-end">
        <Button 
          size="sm" 
          onClick={handleSave}
          className="h-8"
        >
          <Check size={16} className="mr-1" /> Salvar
        </Button>
      </div>
    </div>
  );
};

export const AddTimeSlot: React.FC = () => {
  const { addTimeSlot, user } = useSchedule();
  const [isAdding, setIsAdding] = useState(false);
  const [newSlot, setNewSlot] = useState<TimeSlot>({
    start: '',
    end: '',
    isBreak: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSlot(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setNewSlot(prev => ({ 
      ...prev, 
      isBreak: checked,
      breakName: checked ? (prev.breakName || 'Intervalo') : undefined
    }));
  };

  const handleAdd = () => {
    // Simple validation for time format
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(newSlot.start) || !timeRegex.test(newSlot.end)) {
      toast.error('Formato de horário inválido. Use HH:MM (ex: 08:30)');
      return;
    }

    addTimeSlot(newSlot);
    setNewSlot({
      start: '',
      end: '',
      isBreak: false,
    });
    setIsAdding(false);
  };

  if (!user?.isAdmin) return null;

  if (!isAdding) {
    return (
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-2 mt-4"
        onClick={() => setIsAdding(true)}
      >
        <Plus size={16} />
        Adicionar Novo Horário
      </Button>
    );
  }

  return (
    <div className="mt-4 p-4 border rounded-md bg-card shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-medium">Adicionar Novo Horário</h4>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 w-7 p-0" 
          onClick={() => setIsAdding(false)}
        >
          <X size={16} />
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label htmlFor="new-start" className="text-xs">Início</Label>
          <Input
            id="new-start"
            name="start"
            value={newSlot.start}
            onChange={handleInputChange}
            placeholder="HH:MM"
            className="h-8"
          />
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="new-end" className="text-xs">Fim</Label>
          <Input
            id="new-end"
            name="end"
            value={newSlot.end}
            onChange={handleInputChange}
            placeholder="HH:MM"
            className="h-8"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2 mt-3">
        <Switch
          checked={newSlot.isBreak || false}
          onCheckedChange={handleSwitchChange}
          id="new-is-break"
        />
        <Label htmlFor="new-is-break" className="text-sm">Intervalo/Refeição</Label>
      </div>
      
      {newSlot.isBreak && (
        <div className="space-y-1 mt-3">
          <Label htmlFor="new-breakName" className="text-xs">Nome do Intervalo</Label>
          <Input
            id="new-breakName"
            name="breakName"
            value={newSlot.breakName || ''}
            onChange={handleInputChange}
            placeholder="Ex: Lanche da Manhã"
            className="h-8"
          />
        </div>
      )}
      
      <div className="flex justify-end mt-4">
        <Button onClick={handleAdd}>
          <Plus size={16} className="mr-1" /> Adicionar
        </Button>
      </div>
    </div>
  );
};

export default TimeSlotEditor;
