
import React, { useState } from 'react';
import { ClassSession } from '../utils/types';
import { useSchedule } from '../contexts/ScheduleContext';
import { motion } from 'framer-motion';
import { Edit, Trash2, X, Check } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ClassCardProps {
  classSession: ClassSession;
  color: string;
}

const ClassCard: React.FC<ClassCardProps> = ({ classSession, color }) => {
  const { updateClass, removeClass } = useSchedule();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editedClass, setEditedClass] = useState(classSession);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedClass(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateClass(classSession.id, editedClass);
    setIsEditing(false);
  };

  const handleDelete = () => {
    removeClass(classSession.id);
    setIsDeleting(false);
  };

  const cardVariants = {
    initial: { scale: 0.96, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.96, opacity: 0 },
    hover: { scale: 1.02, boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }
  };

  if (isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 rounded-lg border bg-card shadow-sm"
      >
        <div className="space-y-3">
          <div>
            <Label htmlFor="teacher" className="text-xs">Professor</Label>
            <Input
              id="teacher"
              name="teacher"
              value={editedClass.teacher}
              onChange={handleInputChange}
              placeholder="Nome do professor"
              className="h-8 mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="subject" className="text-xs">Matéria</Label>
            <Input
              id="subject"
              name="subject"
              value={editedClass.subject}
              onChange={handleInputChange}
              placeholder="Nome da matéria"
              className="h-8 mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="room" className="text-xs">Sala</Label>
            <Input
              id="room"
              name="room"
              value={editedClass.room}
              onChange={handleInputChange}
              placeholder="Número da sala"
              className="h-8 mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="timeSlot" className="text-xs">Horário</Label>
            <Input
              id="timeSlot"
              name="timeSlot"
              value={editedClass.timeSlot}
              onChange={handleInputChange}
              placeholder="Ex: 07:30 - 08:20"
              className="h-8 mt-1"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => setIsEditing(false)}
            className="h-8 px-2"
          >
            <X size={16} className="mr-1" /> Cancelar
          </Button>
          <Button 
            size="sm" 
            onClick={handleSave}
            className="h-8 px-2"
          >
            <Check size={16} className="mr-1" /> Salvar
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        variants={cardVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        whileHover="hover"
        className="p-3 rounded-lg shadow-sm transition-all duration-200 border relative overflow-hidden"
        style={{ 
          backgroundColor: `${color}60`, 
          borderColor: `${color}80` 
        }}
      >
        {/* Color indicator */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-1" 
          style={{ backgroundColor: color }}
        ></div>
        
        <div className="pl-2">
          <div className="flex justify-between items-start mb-1">
            <h4 className="font-medium text-sm">
              {classSession.subject || 'Sem matéria'}
            </h4>
            <div className="flex gap-1">
              <button 
                onClick={() => setIsEditing(true)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-black/5 transition-colors"
              >
                <Edit size={14} />
              </button>
              <button 
                onClick={() => setIsDeleting(true)}
                className="text-muted-foreground hover:text-destructive p-1 rounded-full hover:bg-black/5 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
          
          <div className="space-y-1 text-xs">
            {classSession.teacher && (
              <p className="text-muted-foreground">Prof. {classSession.teacher}</p>
            )}
            {classSession.room && (
              <p className="text-muted-foreground">Sala {classSession.room}</p>
            )}
            <p className="text-foreground font-medium">{classSession.timeSlot}</p>
          </div>
        </div>
      </motion.div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleting} onOpenChange={setIsDeleting}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Excluir aula</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir esta aula? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsDeleting(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Excluir
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ClassCard;
