import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import type { MassSchedule } from '@/types/mass-schedule';

const DAYS_OF_WEEK = [
  { value: '0', label: 'Domingo' },
  { value: '1', label: 'Segunda-feira' },
  { value: '2', label: 'Terça-feira' },
  { value: '3', label: 'Quarta-feira' },
  { value: '4', label: 'Quinta-feira' },
  { value: '5', label: 'Sexta-feira' },
  { value: '6', label: 'Sábado' },
];

interface MassScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { day_of_week: number; time: string; notes?: string }) => void;
  isPending: boolean;
  schedule?: MassSchedule | null;
}

export function MassScheduleDialog({
  open,
  onOpenChange,
  onSubmit,
  isPending,
  schedule,
}: MassScheduleDialogProps) {
  const [dayOfWeek, setDayOfWeek] = useState('0');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  const isEditing = !!schedule;

  useEffect(() => {
    if (schedule) {
      setDayOfWeek(String(schedule.day_of_week));
      setTime(schedule.time.slice(0, 5));
      setNotes(schedule.notes ?? '');
    } else {
      setDayOfWeek('0');
      setTime('');
      setNotes('');
    }
  }, [schedule, open]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      day_of_week: Number(dayOfWeek),
      time,
      notes: notes || undefined,
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar Horário' : 'Adicionar Horário'}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Altere as informações do horário de missa.'
              : 'Preencha as informações do novo horário de missa.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='day'>Dia da Semana</Label>
            <Select value={dayOfWeek} onValueChange={setDayOfWeek}>
              <SelectTrigger>
                <SelectValue placeholder='Selecione o dia' />
              </SelectTrigger>
              <SelectContent>
                {DAYS_OF_WEEK.map((day) => (
                  <SelectItem key={day.value} value={day.value}>
                    {day.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='time'>Horário</Label>
            <Input
              id='time'
              type='time'
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='notes'>Observações (opcional)</Label>
            <Input
              id='notes'
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder='Ex.: Missa com canto coral'
            />
          </div>

          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button type='submit' disabled={isPending} className='gap-2'>
              {isPending && <Loader2 className='h-4 w-4 animate-spin' />}
              {isEditing ? 'Salvar' : 'Adicionar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { DAYS_OF_WEEK };
