import { Sparkles } from 'lucide-react';

export function HeroSection() {
  return (
    <div className='text-center space-y-4 relative'>
      <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8'>
        <Sparkles className='h-6 w-6 text-amber-500 opacity-40' />
      </div>
      <h2 className='text-4xl font-bold bg-linear-to-r from-primary via-purple-700 to-primary bg-clip-text text-transparent'>
        Encontre Horários de Missa Perto de Você
      </h2>
      <p className='text-lg text-muted-foreground'>
        Busque missas por bairro e dia da semana
      </p>
    </div>
  );
}
