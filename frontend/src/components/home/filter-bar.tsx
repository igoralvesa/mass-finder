import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, X } from 'lucide-react';

const DAYS_OF_WEEK = [
  { value: '0', label: 'Domingo' },
  { value: '1', label: 'Segunda-feira' },
  { value: '2', label: 'Terça-feira' },
  { value: '3', label: 'Quarta-feira' },
  { value: '4', label: 'Quinta-feira' },
  { value: '5', label: 'Sexta-feira' },
  { value: '6', label: 'Sábado' },
];

export interface FilterValues {
  neighborhood?: string;
  day_of_week?: string;
}

interface FilterBarProps {
  neighborhoods: string[];
  onFilter: (filters: FilterValues) => void;
}

export function FilterBar({ neighborhoods, onFilter }: FilterBarProps) {
  const [neighborhood, setNeighborhood] = useState<string>('');
  const [dayOfWeek, setDayOfWeek] = useState<string>('');

  function handleSearch() {
    onFilter({
      neighborhood: neighborhood || undefined,
      day_of_week: dayOfWeek || undefined,
    });
  }

  function handleClear() {
    setNeighborhood('');
    setDayOfWeek('');
    onFilter({});
  }

  const hasFilters = neighborhood || dayOfWeek;

  return (
    <Card>
      <CardContent className='pt-6'>
        <div className='flex flex-col sm:flex-row gap-4 items-end'>
          <div className='flex-1 space-y-2 w-full'>
            <label htmlFor='neighborhood' className='text-sm font-medium'>
              Bairro
            </label>
            <Select value={neighborhood} onValueChange={setNeighborhood}>
              <SelectTrigger id='neighborhood'>
                <SelectValue placeholder='Selecione um bairro' />
              </SelectTrigger>
              <SelectContent>
                {neighborhoods.map((n) => (
                  <SelectItem key={n} value={n}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='flex-1 space-y-2 w-full'>
            <label htmlFor='day' className='text-sm font-medium'>
              Dia da Semana
            </label>
            <Select value={dayOfWeek} onValueChange={setDayOfWeek}>
              <SelectTrigger id='day'>
                <SelectValue placeholder='Selecione um dia' />
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

          <div className='flex gap-2 w-full sm:w-auto'>
            <Button className='flex-1 sm:flex-none' onClick={handleSearch}>
              <Search className='mr-2 h-4 w-4' />
              Buscar
            </Button>
            {hasFilters && (
              <Button
                variant='outline'
                className='flex-1 sm:flex-none'
                onClick={handleClear}
              >
                <X className='mr-2 h-4 w-4' />
                Limpar
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
