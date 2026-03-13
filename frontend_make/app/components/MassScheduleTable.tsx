import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Edit, Trash2, Check, X } from 'lucide-react';
import { daysOfWeek } from '../data/mockData';

interface Mass {
  id: string;
  day: string;
  time: string;
}

interface MassScheduleTableProps {
  masses: Mass[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function MassScheduleTable({
  masses,
  onEdit,
  onDelete,
}: MassScheduleTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDay, setEditDay] = useState('');
  const [editTime, setEditTime] = useState('');

  const handleEditClick = (mass: Mass) => {
    setEditingId(mass.id);
    setEditDay(mass.day);
    setEditTime(mass.time);
  };

  const handleSave = (id: string) => {
    // TODO: Implementar atualização com API
    // fetch(`/api/masses/${id}`, {
    //   method: 'PUT',
    //   headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ day: editDay, time: editTime })
    // }).then(() => {
    //   onEdit?.(id);
    //   setEditingId(null);
    // });

    onEdit?.(id);
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditDay('');
    setEditTime('');
  };

  return (
    <div className='border rounded-lg'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Dia da Semana</TableHead>
            <TableHead>Horário</TableHead>
            <TableHead className='text-right'>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {masses.map((mass) => {
            const isEditing = editingId === mass.id;

            return (
              <TableRow key={mass.id}>
                <TableCell className='font-medium'>
                  {isEditing ? (
                    <Select value={editDay} onValueChange={setEditDay}>
                      <SelectTrigger className='w-full'>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {daysOfWeek.map((day) => (
                          <SelectItem key={day} value={day}>
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    mass.day
                  )}
                </TableCell>
                <TableCell>
                  {isEditing ? (
                    <Input
                      type='time'
                      value={editTime}
                      onChange={(e) => setEditTime(e.target.value)}
                      className='w-32'
                    />
                  ) : (
                    mass.time
                  )}
                </TableCell>
                <TableCell className='text-right'>
                  <div className='flex justify-end gap-2'>
                    {isEditing ? (
                      <>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={() => handleSave(mass.id)}
                          className='text-green-600 hover:text-green-700 hover:bg-green-50'
                        >
                          <Check className='h-4 w-4' />
                        </Button>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={handleCancel}
                          className='text-muted-foreground hover:text-foreground'
                        >
                          <X className='h-4 w-4' />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={() => handleEditClick(mass)}
                        >
                          <Edit className='h-4 w-4' />
                        </Button>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={() => onDelete?.(mass.id)}
                        >
                          <Trash2 className='h-4 w-4 text-destructive' />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
