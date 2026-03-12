import { createFileRoute } from '@tanstack/react-router';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';

export const Route = createFileRoute('/dashboard-parish')({
  component: DashboardParishPage,
});

function DashboardParishPage() {
  return (
    <div className='min-h-screen bg-background'>
      <DashboardHeader title='Mass Finder' role='parish' />
      <main className='p-8 bg-linear-to-br from-background to-accent/5 min-h-[calc(100vh-73px)]'>
        <div className='container mx-auto'>
          <h2 className='text-xl font-semibold text-muted-foreground'>
            Dashboard Paróquia
          </h2>
          <p className='text-sm text-muted-foreground mt-2'>
            O conteúdo do painel da paróquia será implementado na próxima etapa.
          </p>
        </div>
      </main>
    </div>
  );
}
