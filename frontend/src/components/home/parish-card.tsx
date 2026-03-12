import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Church, Loader2 } from 'lucide-react';
import { usePublicParishById } from '@/hooks';
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

function formatMassLabel(mass: MassSchedule): string {
  const day = DAY_OF_WEEK_LABELS[mass.day_of_week] ?? `Dia ${mass.day_of_week}`;
  return `${day} - ${mass.time}`;
}

interface ParishCardProps {
  id: number;
  name: string;
  neighborhood: string;
  address: string;
  imageUrl?: string;
}

export function ParishCard({
  id,
  name,
  neighborhood,
  address,
  imageUrl,
}: ParishCardProps) {
  const { data, isLoading } = usePublicParishById(id);
  const massSchedules = data?.data.mass_schedules ?? [];

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
            {isLoading ? (
              <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
            ) : massSchedules.length > 0 ? (
              massSchedules.map((mass) => (
                <Badge
                  key={mass.id}
                  variant='secondary'
                  className='bg-accent/50 hover:bg-accent'
                >
                  {formatMassLabel(mass)}
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
