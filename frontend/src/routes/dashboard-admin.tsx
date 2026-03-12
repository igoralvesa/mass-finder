import { createFileRoute } from '@tanstack/react-router';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';

export const Route = createFileRoute('/dashboard-admin')({
  component: DashboardAdminPage,
});

function DashboardAdminPage() {
  return (
    <div className='min-h-screen bg-background'>
      <DashboardHeader title='Mass Finder' role='admin' />
      <main className='p-8 bg-linear-to-br from-background to-secondary/5 min-h-[calc(100vh-73px)]'>
        <div className='container mx-auto'>
          <h2 className='text-xl font-semibold text-muted-foreground'>
            Dashboard Admin
          </h2>
          <p className='text-sm text-muted-foreground mt-2'>
            O conteúdo do painel administrativo será implementado na próxima
            etapa.
          </p>
        </div>
      </main>
    </div>
  );
}
