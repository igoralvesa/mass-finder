import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Church } from 'lucide-react';
import type { MassSchedule } from '@/types/mass-schedule';

const DAY_OF_WEEK_LABELS: Record<number, string> = {
  0: 'Domingo',
  1: 'Segunda-feira',
  2: 'Terça-feira',
  3: 'Quarta-feira',
  4: 'Quinta-feira',
  5: 'Sexta-feira',
  6: 'Sábado',
};

function groupSchedulesByDay(massSchedules: MassSchedule[]): Map<number, MassSchedule[]> {
  const grouped = new Map<number, MassSchedule[]>();
  for (const mass of massSchedules) {
    const existing = grouped.get(mass.day_of_week) ?? [];
    existing.push(mass);
    grouped.set(mass.day_of_week, existing);
  }
  return grouped;
}

function formatGroupedLabel(dayOfWeek: number, schedules: MassSchedule[]): string {
  const day = DAY_OF_WEEK_LABELS[dayOfWeek] ?? `Dia ${dayOfWeek}`;
  const times = schedules.map((s) => s.time).join(', ');
  return `${day} - ${times}`;
}

interface ParishCardProps {
  name: string;
  neighborhood: string;
  address: string;
  massSchedules: MassSchedule[];
  imageUrl?: string;
}

export function ParishCard({
  name,
  neighborhood,
  address,
  massSchedules,
  imageUrl,
}: ParishCardProps) {
  return (
    <Card className='hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-primary/20 overflow-hidden'>
      {imageUrl && (
        <div className='h-40 w-full overflow-hidden'>
          <img
            src={imageUrl}
            alt={name}
            className='h-full w-full object-cover'
          />
        </div>
      )}
      <CardHeader>
        <div className='flex items-start gap-3'>
          <div className='p-2 rounded-lg bg-primary/10 text-primary'>
            <Church className='h-5 w-5' />
          </div>
          <div className='flex-1'>
            <CardTitle className='text-xl'>{name}</CardTitle>
            <CardDescription className='flex items-center gap-1 mt-1'>
              <MapPin className='h-3 w-3' />
              {neighborhood}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className='space-y-4'>
        <p className='text-sm text-muted-foreground flex items-center gap-1'>
          <MapPin className='h-4 w-4' />
          {address}
        </p>

        <div>
          <div className='flex items-center gap-2 mb-2'>
            <Clock className='h-4 w-4 text-muted-foreground' />
            <p className='text-sm font-medium'>Horários de Missa:</p>
          </div>
          <div className='flex flex-wrap gap-2'>
            {massSchedules.length > 0 ? (
              Array.from(groupSchedulesByDay(massSchedules).entries())
                .sort(([a], [b]) => a - b)
                .map(([dayOfWeek, schedules]) => (
                  <Badge
                    key={dayOfWeek}
                    variant='secondary'
                    className='bg-accent/50 hover:bg-accent'
                  >
                    {formatGroupedLabel(dayOfWeek, schedules)}
                  </Badge>
                ))
            ) : (
              <span className='text-sm text-muted-foreground'>
                Nenhum horário cadastrado
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
