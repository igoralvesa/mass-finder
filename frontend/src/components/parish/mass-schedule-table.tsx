import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardAction,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Loader2, Plus, Pencil, Trash2 } from 'lucide-react';
import { MassScheduleDialog, DAYS_OF_WEEK } from './mass-schedule-dialog';
import type { MassSchedule } from '@/types/mass-schedule';

function getDayLabel(dayOfWeek: number): string {
  return DAYS_OF_WEEK.find((d) => d.value === String(dayOfWeek))?.label ?? '—';
}

function formatTime(time: string): string {
  return time.slice(0, 5);
}

interface MassScheduleTableProps {
  schedules: MassSchedule[];
  isLoading: boolean;
  isError: boolean;
  onCreate: (data: {
    day_of_week: number;
    time: string;
    notes?: string;
  }) => void;
  onUpdate: (
    id: number,
    data: { day_of_week: number; time: string; notes?: string },
  ) => void;
  onDelete: (id: number) => void;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  deletingId: number | null;
}

export function MassScheduleTable({
  schedules,
  isLoading,
  isError,
  onCreate,
  onUpdate,
  onDelete,
  isCreating,
  isUpdating,
  isDeleting,
  deletingId,
}: MassScheduleTableProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<MassSchedule | null>(
    null,
  );

  function handleOpenCreate() {
    setEditingSchedule(null);
    setDialogOpen(true);
  }

  function handleOpenEdit(schedule: MassSchedule) {
    setEditingSchedule(schedule);
    setDialogOpen(true);
  }

  function handleDialogSubmit(data: {
    day_of_week: number;
    time: string;
    notes?: string;
  }) {
    if (editingSchedule) {
      onUpdate(editingSchedule.id, data);
    } else {
      onCreate(data);
    }
    setDialogOpen(false);
    setEditingSchedule(null);
  }

  const sortedSchedules = [...schedules].sort((a, b) => {
    if (a.day_of_week !== b.day_of_week) return a.day_of_week - b.day_of_week;
    return a.time.localeCompare(b.time);
  });

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Horários de Missas</CardTitle>
          <CardDescription>
            Adicione, edite ou remova os horários de missa da sua paróquia.
          </CardDescription>
          <CardAction>
            <Button size='sm' className='gap-2' onClick={handleOpenCreate}>
              <Plus className='h-4 w-4' />
              Adicionar Horário
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className='flex items-center justify-center py-12'>
              <Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
              <span className='ml-2 text-sm text-muted-foreground'>
                Carregando horários...
              </span>
            </div>
          )}

          {isError && (
            <div className='py-12 text-center'>
              <p className='text-sm text-destructive'>
                Erro ao carregar horários. Tente novamente mais tarde.
              </p>
            </div>
          )}

          {!isLoading && !isError && sortedSchedules.length === 0 && (
            <div className='py-12 text-center'>
              <p className='text-sm text-muted-foreground'>
                Nenhum horário de missa cadastrado.
              </p>
              <p className='text-xs text-muted-foreground mt-1'>
                Clique em "Adicionar Horário" para começar.
              </p>
            </div>
          )}

          {!isLoading && !isError && sortedSchedules.length > 0 && (
            <div className='border rounded-lg'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Dia da Semana</TableHead>
                    <TableHead>Horário</TableHead>
                    <TableHead>Observações</TableHead>
                    <TableHead className='text-right'>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedSchedules.map((schedule) => (
                    <TableRow key={schedule.id}>
                      <TableCell className='font-medium'>
                        {getDayLabel(schedule.day_of_week)}
                      </TableCell>
                      <TableCell>{formatTime(schedule.time)}</TableCell>
                      <TableCell className='text-muted-foreground'>
                        {schedule.notes || '—'}
                      </TableCell>
                      <TableCell>
                        <div className='flex justify-end gap-2'>
                          <Button
                            variant='ghost'
                            size='icon-sm'
                            onClick={() => handleOpenEdit(schedule)}
                          >
                            <Pencil className='h-4 w-4' />
                          </Button>
                          <Button
                            variant='ghost'
                            size='icon-sm'
                            className='text-destructive hover:text-destructive'
                            onClick={() => onDelete(schedule.id)}
                            disabled={
                              isDeleting && deletingId === schedule.id
                            }
                          >
                            {isDeleting && deletingId === schedule.id ? (
                              <Loader2 className='h-4 w-4 animate-spin' />
                            ) : (
                              <Trash2 className='h-4 w-4' />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <MassScheduleDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setEditingSchedule(null);
        }}
        onSubmit={handleDialogSubmit}
        isPending={editingSchedule ? isUpdating : isCreating}
        schedule={editingSchedule}
      />
    </>
  );
}
