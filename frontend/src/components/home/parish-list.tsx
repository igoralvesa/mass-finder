import { churchImages } from '@/assets/church-images';
import { ParishCard } from './parish-card';
import type { ParishDetail } from '@/types/parish';
import { Church } from 'lucide-react';

interface ParishListProps {
  parishes: ParishDetail[];
}

export function ParishList({ parishes }: ParishListProps) {
  if (parishes.length === 0) {
    return (
      <div className='text-center py-12 space-y-3'>
        <div className='mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center'>
          <Church className='h-6 w-6 text-muted-foreground' />
        </div>
        <p className='text-muted-foreground'>Nenhuma paróquia encontrada.</p>
      </div>
    );
  }

  const getRandomImage = (index: number) => {
    const key = (index % 10) as keyof typeof churchImages;
    return churchImages[key];
  };

  return (
    <div className='space-y-4'>
      <h3 className='text-2xl font-semibold'>Paróquias Disponíveis</h3>
      <div className='grid gap-6 md:grid-cols-2'>
        {parishes.map((parish, index) => (
          <ParishCard
            key={parish.id}
            name={parish.name}
            neighborhood={parish.neighborhood}
            address={parish.address}
            massSchedules={parish.mass_schedules}
            imageUrl={getRandomImage(index)}
          />
        ))}
      </div>
    </div>
  );
}
